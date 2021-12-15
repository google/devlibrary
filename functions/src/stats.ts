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

import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { BlogData, BlogStats, RepoData, RepoStats } from "../../shared/types";

import { GitHubRepo } from "./github";

export function makeRepoStats(
  existing: RepoData | undefined,
  repo: GitHubRepo
): RepoStats {
  // Determine the date the content was added to the site
  const dateAdded =
    existing && existing.stats.dateAdded
      ? existing.stats.dateAdded
      : new Date().getTime();

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    dateAdded,
    lastUpdated: Date.parse(repo.pushed_at),
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
  return {
    minutes: 0,
    claps: 0,
    dateAdded,
    lastUpdated: dateAdded,
  };
}
