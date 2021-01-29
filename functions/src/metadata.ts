import * as fs from "fs";
import * as path from "path";
import { BlogMetadata, GitHubProjectMetadata } from "../../shared/types";

export async function loadProjectMetadata(product: string) {
  // TODO: Load this using the GitHub API not from the local file system
  const configPath = path.resolve(`../config/${product}`);
  const reposPath = path.join(configPath, "repos");
  const blogsPath = path.join(configPath, "blogs");

  const repos: Record<string, GitHubProjectMetadata> = {};
  const repoFiles = fs.readdirSync(reposPath);
  for (const f of repoFiles) {
    const fpath = path.join(reposPath, f);

    // The file name (without.json) is the id
    const id = f.split(".")[0];
    const metadata = JSON.parse(
      fs.readFileSync(fpath).toString()
    ) as GitHubProjectMetadata;

    repos[id] = metadata;
  }

  const blogs: Record<string, BlogMetadata> = {};
  const blogFiles = fs.readdirSync(blogsPath);
  for (const f of blogFiles) {
    const fpath = path.join(blogsPath, f);

    // The file name (without.json) is the id
    const id = f.split(".")[0];
    const metadata = JSON.parse(
      fs.readFileSync(fpath).toString()
    ) as BlogMetadata;

    blogs[id] = metadata;
  }

  return { repos, blogs };
}
