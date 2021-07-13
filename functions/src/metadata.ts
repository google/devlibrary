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

import * as fs from "fs";
import * as path from "path";

import * as github from "./github";

import { BlogMetadata } from "../../shared/types/BlogMetadata";
import { RepoMetadata } from "../../shared/types/RepoMetadata";
import { AuthorMetadata } from "../../shared/types/AuthorMetadata";

async function listAuthorFiles(): Promise<string[]> {
  if (process.env.FUNCTIONS_EMULATOR) {
    const configPath = path.resolve(`../config/authors`);
    const authorFiles = fs.readdirSync(configPath);
    return authorFiles.map((f) => path.join(configPath, f));
  }

  return await github.getDirectoryContent(
    "google",
    "devlibrary",
    "main",
    `config/authors`
  );
}

async function listConfigFiles(
  product: string,
  type: string
): Promise<string[]> {
  if (process.env.FUNCTIONS_EMULATOR) {
    const configPath = path.resolve(`../config/${product}`);
    const typePath = path.join(configPath, type);

    const typeFiles = fs.readdirSync(typePath);
    return typeFiles
      .filter((f) => f.endsWith(".json"))
      .map((f) => path.join(typePath, f));
  }

  const ghFiles = await github.getDirectoryContent(
    "google",
    "devlibrary",
    "main",
    `config/${product}/${type}`
  );

  return ghFiles.filter((f) => f.endsWith(".json"));
}

async function readConfigFile(filePath: string): Promise<string> {
  if (process.env.FUNCTIONS_EMULATOR) {
    return fs.readFileSync(filePath).toString();
  }

  return await github.getFileContent("google", "devlibrary", "main", filePath);
}

export async function loadAuthorMetadata() {
  const authorFiles = await listAuthorFiles();

  const res: Record<string, AuthorMetadata> = {};
  for (const f of authorFiles) {
    // The file name (without.json) is the id
    const id = path.basename(f).split(".")[0];
    const content = await readConfigFile(f);
    const metadata = JSON.parse(content) as AuthorMetadata;
    res[id] = metadata;
  }

  return res;
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
