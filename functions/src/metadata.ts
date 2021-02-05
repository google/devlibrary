import * as fs from "fs";
import * as path from "path";

import * as github from "./github";

import { BlogMetadata, RepoMetadata } from "../../shared/types";

async function listConfigFiles(
  product: string,
  type: string
): Promise<string[]> {
  if (process.env.FUNCTIONS_EMULATOR) {
    const configPath = path.resolve(`../config/${product}`);
    const typePath = path.join(configPath, type);

    const typeFiles = fs.readdirSync(typePath);
    return typeFiles.map((f) => path.join(typePath, f));
  }

  return await github.getDirectoryContent(
    "FirebasePrivate",
    "ugc.dev",
    "main",
    `config/${product}/${type}`
  );
}

async function readConfigFile(filePath: string): Promise<string> {
  if (process.env.FUNCTIONS_EMULATOR) {
    return fs.readFileSync(filePath).toString();
  }

  return await github.getFileContent(
    "FirebasePrivate",
    "ugc.dev",
    "main",
    filePath
  );
}

export async function loadProjectMetadata(product: string) {
  const repoFiles = await listConfigFiles(product, "repos");
  const blogFiles = await listConfigFiles(product, "blogs");

  const repos: Record<string, RepoMetadata> = {};

  for (const f of repoFiles) {
    // The file name (without.json) is the id
    const id = path.basename(f).split(".")[0];
    const content = await readConfigFile(f);
    const metadata = JSON.parse(content) as RepoMetadata;
    repos[id] = metadata;
  }

  const blogs: Record<string, BlogMetadata> = {};
  for (const f of blogFiles) {
    // The file name (without.json) is the id
    const id = path.basename(f).split(".")[0];
    const content = await readConfigFile(f);
    const metadata = JSON.parse(content) as BlogMetadata;
    blogs[id] = metadata;
  }

  return { repos, blogs };
}
