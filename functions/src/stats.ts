import { BlogMetadata, BlogStats, GitHubProjectMetadata, GithubProjectStats } from "../../shared/types";

export async function loadGithubStats(metadata: GitHubProjectMetadata): Promise<GithubProjectStats> {
  // TODO: Make this real
  return {
    stars: Math.floor(Math.random() * 1000),
    forks: Math.floor(Math.random() * 1000)
  }
}

export async function loadBlogStats(metadata: BlogMetadata): Promise<BlogStats> {
  // TODO: Make this real
  return {
    minutes: Math.floor(Math.random() * 30),
  }
}
