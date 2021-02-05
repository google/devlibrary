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
  // TODO: Make this real
  return {
    minutes: random(30),
    lastUpdated: randomTimestamp(),
  };
}

function random(ceil: number) {
  return Math.floor(Math.random() * ceil);
}

function randomTimestamp() {
  return new Date().getTime() - random(7 * 24 * 60 * 60 * 1000);
}
