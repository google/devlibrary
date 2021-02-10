import axios from "axios";
import {
  BlogMetadata,
  BlogStats,
  RepoMetadata,
  RepoStats,
} from "../../shared/types";

import * as github from "./github";

export async function loadRepoStats(
  metadata: RepoMetadata
): Promise<RepoStats> {
  const repo = await github.getRepo(metadata.owner, metadata.repo);
  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: Date.parse(repo.updated_at),
  };
}

export async function loadBlogStats(
  metadata: BlogMetadata
): Promise<BlogStats> {
  // Medium has a secret JSON API
  const url = `${metadata.link}?format=json`;

  console.log(url);

  const res = await axios.get(url);

  // Payloads start with something like this to prevent eval:
  // ])}while(1);</x>{
  // We just start at the first {
  const payload = res.data as string;

  try {
    const data = JSON.parse(payload.substr(payload.indexOf("{")));

    const minutes = Math.round(data.payload.value.virtuals.readingTime);
    const claps = data.payload.value.virtuals.totalClapCount;
    const lastUpdated = data.payload.value.latestPublishedAt;

    return {
      minutes,
      claps,
      lastUpdated,
    };
  } catch (e) {
    console.error(`Could not get stats for ${metadata.link}`, e);

    // By default we'll just say 10 minute read, 50 claps, 30 days ago.
    return {
      minutes: 10,
      claps: 50,
      lastUpdated: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
    };
  }
}
