import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { BlogData, BlogStats, RepoData, RepoStats } from "../../shared/types";

import * as github from "./github";

export async function loadRepoStats(
  metadata: RepoMetadata,
  existing: RepoData | undefined
): Promise<RepoStats> {
  // Determine the date the content was added to the site
  const dateAdded =
    existing && existing.stats.dateAdded
      ? existing.stats.dateAdded
      : new Date().getTime();

  const repo = await github.getRepo(metadata.owner, metadata.repo);

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    dateAdded,
    lastUpdated: Date.parse(repo.updated_at),
  };
}

export async function loadBlogStats(
  metadata: BlogMetadata,
  existing: BlogData | undefined
): Promise<BlogStats> {
  // Determine the date the content was added to the site
  const dateAdded =
    existing && existing.stats.dateAdded
      ? existing.stats.dateAdded
      : new Date().getTime();

    // We are not allowed to use the Medium API for now
    // See: https://github.com/FirebasePrivate/ugc.dev/issues/70
    return {
      minutes: 0,
      claps: 0,
      dateAdded,
      lastUpdated: dateAdded
    }
}
