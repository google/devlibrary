/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";

import equal from "fast-deep-equal";

import { loadAuthorMetadata, loadProjectMetadata } from "./metadata";
import { loadBlogStats, makeRepoStats } from "./stats";
import {
  deleteAuthorData,
  deleteBlogData,
  deleteRepoData,
  getBlogData,
  getRepoData,
  listAuthorIds,
  listProjectIds,
  saveAuthorData,
  saveBlogData,
  saveRepoData,
  saveRepoPage,
} from "./firestore";

import * as content from "./content";
import * as github from "./github";

import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { AuthorData, ProductKey, RepoPage } from "../../shared/types";
import {
  index,
  indexAuthor,
  unIndexAuthor,
  unIndexBlog,
  unIndexRepo,
} from "./search";

// See: https://firebase.google.com/docs/functions/writing-and-viewing-logs#console-log
require("firebase-functions/lib/logger/compat");

admin.initializeApp();

const pubsub = new PubSub();

/** Proxy functions */
export { queryProxy, docProxy, emojis } from "./proxy";

/** Search functions */
export { elasticSearch } from "./search";

/** Photo functions */
export { authorPhoto } from "./photos";

/** Sitemap generator */
export { sitemap } from "./sitemap";

/**
 * Return elements of a that are not in b
 */
function getDiff<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
}

async function refreshAllProjects() {
  const products = Object.values(ProductKey);

  for (const product of products) {
    console.log("Refreshing product", product);

    // Refresh or create a blog/repo entry for each config JSON
    const { blogs, repos } = await loadProjectMetadata(product);

    for (const [id, metadata] of Object.entries(blogs)) {
      await pubsub.topic("refresh-blog").publishJSON({
        product,
        id,
        metadata,
        force: false,
      });
    }

    for (const [id, metadata] of Object.entries(repos)) {
      await pubsub.topic("refresh-repo").publishJSON({
        product,
        id,
        metadata,
        force: false,
      });
    }

    // Update search indices
    await index(product, repos, blogs);

    // List all of the existing blogs/repos and
    // delete any entries where the JSON no longer exists
    const existingIds = await listProjectIds(product);

    const newBlogIds = Object.keys(blogs);
    const blogsToDelete = getDiff(existingIds.blogs, newBlogIds);
    for (const b of blogsToDelete) {
      console.log(`Deleting ${product} blog ${b}`);
      await deleteBlogData(product, b);
      await unIndexBlog(b);
    }

    const newRepoIds = Object.keys(repos);
    const reposToDelete = getDiff(existingIds.repos, newRepoIds);
    for (const r of reposToDelete) {
      console.log(`Deleting ${product} repo ${r}`);
      await deleteRepoData(product, r);
      await unIndexRepo(r);
    }
  }
}

async function refreshAllAuthors() {
  const authors = await loadAuthorMetadata();

  for (const id in authors) {
    const data: AuthorData = {
      id,
      metadata: authors[id],
    };

    await saveAuthorData(id, data);
    await indexAuthor(data);
  }

  // List all of the existing authors and
  // delete any entries where the JSON no longer exists
  const existingIds = await listAuthorIds();
  const newAuthorIds = Object.keys(authors);
  const authorsToDelete = getDiff(existingIds, newAuthorIds);
  for (const a of authorsToDelete) {
    console.log(`Deleting author ${a}`);
    await deleteAuthorData(a);
    await unIndexAuthor(a);
  }

  // TODO: Author search indexing
}

async function refreshRepoInternal(
  product: string,
  id: string,
  metadata: RepoMetadata,
  force: boolean = false
) {
  console.log("Refreshing repo", product, id);

  // Get the existing repo data from the database
  const existing = await getRepoData(product, id);
  if (!existing) {
    console.log(`[${product}/${id}] is new.`);
  }

  // Get the latest repo stats from GitHub
  const ghRepo = await github.getRepo(metadata.owner, metadata.repo);
  const stats = makeRepoStats(existing, ghRepo);

  // First save the repo's stats and metadata
  const repo = {
    id,
    product,
    metadata,
    stats,
  };
  await saveRepoData(product, repo);

  const recentlyPushed =
    existing && stats.lastUpdated > existing.stats.lastUpdated;
  if (recentlyPushed) {
    console.log(
      `[${product}/${id}] has been updated since last pull (lastUpdated = ${stats.lastUpdated}).`
    );
  } else {
    console.log(
      `[${product}/${id}] not recently pushed (lastUpdated = ${stats.lastUpdated}).`
    );
  }

  const metadataChanged = existing && !equal(existing.metadata, metadata);
  if (existing && metadataChanged) {
    console.log(`[${product}/${id}] repo has metadata changes.`);
    console.log("old", JSON.stringify(existing.metadata));
    console.log("new", JSON.stringify(metadata));
  } else {
    console.log(`[${product}/${id}] does not have metadata changes.`);
  }

  // We consider the repo recently changed if any of:
  //  - It did not exist before
  //  - It had a recent metadata change (on our side)
  //  - It was recently pushed (on their side)
  //
  // If the repo is not recently changed, we can exit early to save API calls
  const shouldUpdate = !existing || recentlyPushed || metadataChanged || force;
  if (!shouldUpdate) {
    console.log(`[${product}/${id}] skipping update.`);
    return;
  }

  // First check the license
  const license = await github.getRepoLicense(metadata.owner, metadata.repo);
  if (!(license.key === "mit" || license.key === "apache-2.0")) {
    console.warn(
      `Invalid license ${license.key} for repo ${metadata.owner}/${metadata.repo}`
    );

    // Delete the repo and exit early
    await deleteRepoData(product, id);
    return;
  }

  // Then save a document for each page
  const pages = [
    {
      name: "main",
      path: metadata.content,
    },
    ...(metadata.pages || []),
  ];

  const branch = ghRepo.default_branch || "master";

  let emojis = {};
  try {
    emojis = await github.getEmojiMap();
  } catch (e) {
    console.warn("Failed to get emojis from GitHub", e);
  }

  for (const p of pages) {
    // Get Markdown from GitHub
    const md = await github.getFileContent(
      metadata.owner,
      metadata.repo,
      branch,
      p.path
    );

    // Render into a series of HTML "sections"
    const sections = content.renderContent(
      product,
      repo,
      p.path,
      md,
      branch,
      emojis
    );

    const data: RepoPage = {
      name: p.name,
      path: p.path,
      sections,
    };
    await saveRepoPage(product, repo, p.path, data);
  }

  // Save the licesne as a page
  const licensePage: RepoPage = {
    name: "License",
    path: "license",
    sections: [
      {
        name: "License",
        content: `<pre>${license.content}</pre>`,
      },
    ],
  };

  await saveRepoPage(product, repo, licensePage.path, licensePage);
}

// Cron job to refresh all projects each day
export const refreshProjectsCron = functions
  .runWith({
    memory: "2GB",
    timeoutSeconds: 540,
  })
  .pubsub.schedule("0 0 * * *")
  .onRun(async (context) => {
    await refreshAllProjects();
    await refreshAllAuthors();
  });

// When in the functions emulator we provide some simple webhooks to refresh things
if (process.env.FUNCTIONS_EMULATOR) {
  exports.refreshProjects = functions.https.onRequest(
    async (request, response) => {
      await refreshAllProjects();
      response.json({ status: "ok" });
    }
  );

  exports.refreshAuthors = functions.https.onRequest(
    async (request, response) => {
      await refreshAllAuthors();
      response.json({ status: "ok" });
    }
  );

  exports.forceRefreshRepo = functions.https.onRequest(
    async (request, response) => {
      const product = request.query["product"] as string | undefined;
      const id = request.query["id"] as string | undefined;
      const forceParam = request.query["force"] as string | undefined;

      if (!(product && id)) {
        response.status(400).send("Must include product and id query params");
        return;
      }

      const { repos } = await loadProjectMetadata(product);
      const metadata = repos[id];

      if (!metadata) {
        response
          .status(404)
          .send(`Repo /products/${product}/repos/${id} not found`);
        return;
      }

      // Force is default, ?force=false overrides it
      const force = forceParam === "false" ? false : true;

      await refreshRepoInternal(product, id, metadata, force);
      response.status(200).send(`Refreshed /products/${product}/repos/${id}`);
    }
  );
}

export const refreshBlog = functions.pubsub
  .topic("refresh-blog")
  .onPublish(async (message, context) => {
    if (!(message.json.product && message.json.id && message.json.metadata)) {
      throw new Error(`Invalid message: ${JSON.stringify(message.json)}`);
    }

    const product = message.json.product as string;
    const id = message.json.id as string;
    const metadata = message.json.metadata as BlogMetadata;

    console.log("Refreshing blog", product, id);

    const existing = await getBlogData(product, id);
    const stats = await loadBlogStats(metadata, existing);
    const blog = {
      id,
      product,
      metadata,
      stats,
    };

    await saveBlogData(product, blog);
  });

export const refreshRepo = functions.pubsub
  .topic("refresh-repo")
  .onPublish(async (message, context) => {
    if (!(message.json.product && message.json.id && message.json.metadata)) {
      throw new Error(`Invalid message: ${JSON.stringify(message.json)}`);
    }

    const product = message.json.product as string;
    const id = message.json.id as string;
    const metadata = message.json.metadata as RepoMetadata;
    const force = !!message.json.force;

    await refreshRepoInternal(product, id, metadata, force);
  });
