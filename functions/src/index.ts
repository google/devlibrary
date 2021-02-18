import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";

import { loadProjectMetadata } from "./metadata";
import { loadBlogStats, loadRepoStats } from "./stats";
import {
  deleteRepoData,
  getBlogData,
  getRepoData,
  saveBlogData,
  saveRepoData,
  saveRepoPage,
} from "./firestore";

import * as content from "./content";
import * as github from "./github";

import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { ProductKey, RepoPage } from "../../shared/types";

admin.initializeApp();

const pubsub = new PubSub();

async function refreshAll() {
  const products = Object.values(ProductKey);

  for (const product of products) {
    console.log("Refreshing product", product);

    const { repos, blogs } = await loadProjectMetadata(product);

    for (const [id, metadata] of Object.entries(blogs)) {
      await pubsub.topic("refresh-blog").publishJSON({
        product,
        id,
        metadata,
      });
    }

    for (const [id, metadata] of Object.entries(repos)) {
      await pubsub.topic("refresh-repo").publishJSON({
        product,
        id,
        metadata,
      });
    }
  }
}

// Cron job to refresh all projects each day
export const refreshProjectsCron = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async (context) => {
    await refreshAll();
  });

// When in the functions emulator we provide a simple webhook to refresh things
if (process.env.FUNCTIONS_EMULATOR) {
  exports.refreshProjects = functions.https.onRequest(
    async (request, response) => {
      await refreshAll();
      response.json({ status: "ok" });
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

    console.log("Refreshing repo", product, id);

    // Get the existing repo
    const existing = await getRepoData(product, id);

    // If the repo doesn't have the right license, exit early
    const license = await github.getRepoLicense(metadata.owner, metadata.repo);
    if (!(license.key === "mit" || license.key === "apache-2.0")) {
      console.warn(
        `Invalid license ${license.key} for repo ${metadata.owner}/${metadata.repo}`
      );
      if (existing) {
        await deleteRepoData(product, id);
        return;
      }
    }

    // First save the repo's stats and metadata
    const stats = await loadRepoStats(metadata, existing);
    const repo = {
      id,
      metadata,
      stats,
    };
    await saveRepoData(product, repo);

    // Then save a document for each page
    const pages = [
      {
        name: "main",
        path: metadata.content,
      },
      ...(metadata.pages || []),
    ];

    const branch = await github.getDefaultBranch(metadata.owner, metadata.repo);

    for (const p of pages) {
      // Get Markdown from GitHub
      const md = await github.getFileContent(
        metadata.owner,
        metadata.repo,
        branch,
        p.path
      );

      // Render into a series of HTML "sections"
      const sections = content.renderContent(product, repo, p.path, md, branch);

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
  });
