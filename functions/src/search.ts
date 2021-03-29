import * as functions from "firebase-functions";
import { Client } from "@elastic/elasticsearch";

import * as config from "./config";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { BlogSearchResult, RepoSearchResult, SearchResult } from "../../shared/types";

const client = new Client({
  cloud: {
    id: config.get("elastic", "id"),
    username: config.get("elastic", "username"),
    password: config.get("elastic", "password"),
  }
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
      index: "repos",
      id,
      body: {
        id,
        product,
        metadata: repo
      },
    });
    promises.push(p);
  }

  for (const [id, blog] of Object.entries(blogs)) {
    const p = client.index({
      index: "blogs",
      id,
      body: {
        id,
        product,
        metadata: blog
      },
    });
    promises.push(p);
  }

  await Promise.all(promises);

  // We need to force an index refresh at this point, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: "repos" });
  await client.indices.refresh({ index: "blogs" });
}

export async function search(term: string, limit: number): Promise<SearchResult[]> {
  const reposRes = await client.search({
    index: "repos",
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
    index: "blogs",
    body: {
      query: {
        query_string: {
          query: `*${term}*`,
          fields: [
            "metadata.author^0.5", 
            "metadata.title^2", 
            "metadata.tags"
          ],
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

  // Sort and return the top {limit} results
  const halfLimit = Math.ceil(limit / 2);
  const topBlogs = blogResults.slice(0, halfLimit);
  const topRepos = repoResults.slice(0, halfLimit);
  const topResults = [...topBlogs, ...topRepos];
  const sorted = topResults.sort((a, b) => {
    if (a.score === b.score) {
      return b.data.id.localeCompare(a.data.id);
    }

    return b.score - a.score;
  });
  return sorted.slice(0, limit);
}

export const elasticSearch = functions.https.onRequest(async (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");

  // Cache for 12 hours (43200 seconds)
  res.set("Cache-Control", "public, max-age=43200, s-maxage=43200");

  // The "q" param is the search term
  const q = req.query.q as string;

  const result = await search(q, 5);
  res.json(result);
});
