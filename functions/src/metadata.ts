import * as fs from "fs";
import * as path from "path";
import { BlogMetadata, GitHubProjectMetadata } from "../../shared/types";

export async function loadProjectMetadata(product: string) {
  // TODO: Load this using the GitHub API not from the local file system
  const configPath = path.resolve(`../config/${product}`)
  const reposPath = path.join(configPath, 'repos');
  const blogsPath = path.join(configPath, 'blogs');

  const repos: GitHubProjectMetadata[] = [];
  const repoFiles = fs.readdirSync(reposPath);
  for (const f of repoFiles) {
    const fpath = path.join(reposPath, f);
    const metadata = JSON.parse(fs.readFileSync(fpath).toString()) as GitHubProjectMetadata;

    repos.push(metadata);
  }

  const blogs: BlogMetadata[] = [];
  const blogFiles = fs.readdirSync(blogsPath);
  for (const f of blogFiles) {
    const fpath = path.join(blogsPath, f);
    const metadata = JSON.parse(fs.readFileSync(fpath).toString()) as BlogMetadata;

    blogs.push(metadata);
  }

  return { repos, blogs };
}
