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
import { Client } from "@elastic/elasticsearch";

import * as config from "./config";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { BlogMetadata } from "../../shared/types/BlogMetadata";
import {
  AuthorData,
  AuthorSearchResult,
  BlogSearchResult,
  RepoSearchResult,
  SearchResult,
} from "../../shared/types";

const INDEX_AUTHORS = "authors";
const INDEX_REPOS = "repos";
const INDEX_BLOGS = "blogs";

const client = new Client({
  cloud: {
    id: config.get("elastic", "id"),
    username: config.get("elastic", "username"),
    password: config.get("elastic", "password"),
  },
});

export async function index(
  product: string,
  repos: Record<string, RepoMetadata>,
  blogs: Record<string, BlogMetadata>
) {
  const promises = [];

  // TODO: if two repos or blogs on different products had the same
  //       ID this would be an issue.
  for (const [id, repo] of Object.entries(repos)) {
    const p = client.index({
      index: INDEX_REPOS,
      id,
      body: {
        id,
        product,
        metadata: repo,
      },
    });
    promises.push(p);
  }

  for (const [id, blog] of Object.entries(blogs)) {
    const p = client.index({
      index: INDEX_BLOGS,
      id,
      body: {
        id,
        product,
        metadata: blog,
      },
    });
    promises.push(p);
  }

  await Promise.all(promises);

  // We need to force an index refresh at this point, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: INDEX_REPOS });
  await client.indices.refresh({ index: INDEX_BLOGS });
}

export async function indexAuthor(author: AuthorData) {
  const { id, metadata } = author;
  await client.index({
    index: INDEX_AUTHORS,
    id,
    body: {
      id,
      metadata,
    },
  });
}

export async function unIndexAuthor(id: string) {
  await client.delete({
    index: INDEX_AUTHORS,
    id,
  });
}

export async function unIndexBlog(id: string) {
  await client.delete({
    index: INDEX_BLOGS,
    id,
  });
}

export async function unIndexRepo(id: string) {
  await client.delete({
    index: INDEX_REPOS,
    id,
  });
}

export async function search(
  term: string,
  limit: number
): Promise<SearchResult[]> {
  const reposRes = await client.search({
    index: INDEX_REPOS,
    body: {
      query: {
        query_string: {
          query: `*${term}*`,
          fields: [
            "metadata.name",
            "metadata.shortDescription^2",
            "metadata.longDescription^0.5",
            "metadata.owner",
            "metadata.repo^2",
            "metadata.tags",
          ],
        },
      },
    },
  });

  const blogsRes = await client.search({
    index: INDEX_BLOGS,
    body: {
      query: {
        query_string: {
          query: `*${term}*`,
          fields: ["metadata.author^0.5", "metadata.title^2", "metadata.tags"],
        },
      },
    },
  });

  const authorsRes = await client.search({
    index: INDEX_AUTHORS,
    body: {
      query: {
        query_string: {
          query: `*${term}*`,
          fields: ["metadata.name"],
        },
      },
    },
  });

  const repoResults = (reposRes.body.hits.hits as any[]).map((hit: any) => {
    return {
      type: "repo",
      score: hit["_score"],
      data: hit["_source"],
    } as RepoSearchResult;
  });

  const blogResults = (blogsRes.body.hits.hits as any[]).map((hit: any) => {
    return {
      type: "blog",
      score: hit["_score"],
      data: hit["_source"],
    } as BlogSearchResult;
  });

  const authorResults = (authorsRes.body.hits.hits as any[]).map((hit: any) => {
    return {
      type: "author",
      score: hit["_score"],
      data: hit["_source"],
    } as AuthorSearchResult;
  });

  // Sort and return the top {limit} results
  const halfLimit = Math.ceil(limit / 2);
  const topBlogs = blogResults.slice(0, halfLimit);
  const topRepos = repoResults.slice(0, halfLimit);
  const topAuthors = authorResults.slice(0, halfLimit);
  const topResults = [...topBlogs, ...topRepos, ...topAuthors];
  const sorted = topResults.sort((a, b) => {
    if (a.score === b.score) {
      return b.data.id.localeCompare(a.data.id);
    }

    return b.score - a.score;
  });
  return sorted.slice(0, limit);
}

export const elasticSearch = functions
  .runWith({
    minInstances: 1,
  })
  .https.onRequest(async (req, res) => {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");

    // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
    res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

    // The "q" param is the search term
    const q = req.query.q as string;

    const result = await search(q, 5);
    res.json(result);
  });
