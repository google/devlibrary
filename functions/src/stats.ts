import {
  BlogMetadata,
  BlogStats,
  RepoMetadata,
  RepoStats,
} from "../../shared/types";

export async function loadRepoStats(
  metadata: RepoMetadata
): Promise<RepoStats> {
  // TODO: Make this real
  return {
    stars: random(1000),
    forks: random(1000),
    lastUpdated: randomTimestamp(),
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
