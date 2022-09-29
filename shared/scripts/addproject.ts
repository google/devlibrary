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
import fetch from "node-fetch";
import ogs from "open-graph-scraper";
import * as path from "path";
import { URL } from "url";

import { BlogMetadata } from "../types/BlogMetadata";
import { RepoMetadata } from "../types/RepoMetadata";

import {
  addGithubAuthor,
  addMediumAuthor,
  authorExists,
  getMediumPostAuthor,
  normalizeAuthorId,
} from "./addauthor";
import { getConfigDir, writeOrUpdateJSON } from "./util";

/**
 * @returns {Promise<string>} the project ID
 */
export async function addOtherBlog(
  product: string,
  projectUrl: string,
  projectId?: string,
  overrides?: Partial<BlogMetadata>
): Promise<string> {
  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-blog.json"))
    .toString();
  const blogFileContent = JSON.parse(templateStr) as BlogMetadata;
  blogFileContent.source = "other";
  blogFileContent.link = projectUrl;

  Object.assign(blogFileContent, overrides || {});

  // Get the title from OpenGraph
  try {
    const { result } = await ogs({
      url: projectUrl,
    });
    if (result.success && result.ogTitle) {
      blogFileContent.title = result.ogTitle;
    }
  } catch (e) {
    console.warn(`Warning: could not get OpenGraph title from ${projectUrl}`);
  }

  // Make a slug ID from the URL
  const u = new URL(projectUrl);

  // Generally we want to use the pathname but if there is no path
  // we try to clean up the hostname
  const baseName =
    u.pathname && u.pathname !== "/"
      ? u.pathname
      : u.hostname.replace("www.", "").replace(/\./g, "-");
  const segments = baseName
    .split("/")
    .map((s) => s.split(".")[0])
    .filter((s) => s.length > 0);
  const slug = segments.join("-");

  const blogId = projectId || slug;
  const blogFilePath = path.join(
    getConfigDir(),
    product,
    "blogs",
    `${blogId}.json`
  );
  writeOrUpdateJSON(blogFilePath, blogFileContent);

  return blogId;
}

function parseMediumUrl(projectUrl: string) {
  // Types of medium URL
  // 1) https://medium.com/user/post-slug-12345abcde
  // 2) https://user.medium.com/post-slug-12345abcde
  const mainRe = /medium\.com\/([\w\-\@\.]+)\/([\w\-]+)/;
  const mainMatch = projectUrl.match(mainRe);
  if (mainMatch) {
    return {
      author: mainMatch[1],
      slug: mainMatch[2],
    };
  }

  const subdomainRe = /([\w\-\@\.]+)\.medium\.com\/([\w\-]+)/;
  const subdomainMatch = projectUrl.match(subdomainRe);
  if (subdomainMatch) {
    return {
      author: subdomainMatch[1],
      slug: subdomainMatch[2],
    };
  }

  return {};
}

/**
 * @returns {Promise<string>} the project ID
 */
export async function addMediumBlog(
  product: string,
  projectUrl: string,
  projectId?: string,
  overrides?: Partial<BlogMetadata>
): Promise<string> {
  const { slug } = parseMediumUrl(projectUrl);

  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-blog.json"))
    .toString();
  const blogFileContent = JSON.parse(templateStr) as BlogMetadata;
  blogFileContent.link = projectUrl;

  Object.assign(blogFileContent, overrides || {});

  // Add the author
  // TODO: This doesn't work for proandroiodev, etc
  const postAuthor = await getMediumPostAuthor(projectUrl);
  if (postAuthor) {
    if (!authorExists(postAuthor)) {
      await addMediumAuthor(postAuthor);
    }
  }
  blogFileContent.authorIds = postAuthor ? [normalizeAuthorId(postAuthor)] : [];

  const blogId = projectId || slug;
  if (!blogId) {
    throw new Error(`Could not parse Medium URL: ${projectUrl}`);
  }

  const blogFilePath = path.join(
    getConfigDir(),
    product,
    "blogs",
    `${blogId}.json`
  );
  writeOrUpdateJSON(blogFilePath, blogFileContent);

  return blogId;
}

function getGithubHeaders() {
  // If available, use a GitHub token from the environment
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

interface GitHubLicense {
  path: string;
  license: {
    key: string; // "mit", "apache-2.0", etc
  };
}

export async function getRepoLicense(
  owner: string,
  repo: string
): Promise<GitHubLicense | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/license`,
    {
      method: "get",
      headers: getGithubHeaders(),
    }
  );

  if (!res.ok) {
    return;
  }

  return await res.json();
}

export async function getRepoReadme(
  owner: string,
  repo: string
): Promise<string | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      method: "get",
      headers: getGithubHeaders(),
    }
  );
  const { path } = await res.json();

  return path;
}

interface GitHubContent {
  path: string;
  type: string;
  content: string;
  encoding: string;
}

export async function getRepoContent(
  owner: string,
  repo: string,
  contentPath: string
): Promise<GitHubContent | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${contentPath}`,
    {
      method: "get",
      headers: getGithubHeaders(),
    }
  );

  if (!res.ok) {
    return;
  }

  return await res.json();
}

export function parseGithubUrl(projectUrl: string) {
  const re = /github.com\/([\w\-]+)\/([\w\-]+)/;
  const m = projectUrl.match(re);

  if (!m) {
    throw new Error(`Invalid GitHub URL: ${projectUrl}`);
  }

  const owner = m[1];
  const repo = m[2];

  return { owner, repo };
}

/**
 * @returns {Promise<string>} the project ID
 */
export async function addRepo(
  product: string,
  projectUrl: string,
  projectId?: string,
  overrides?: Partial<RepoMetadata>
): Promise<string> {
  const { owner, repo } = parseGithubUrl(projectUrl);

  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-repo.json"))
    .toString();
  const repoFileContent = JSON.parse(templateStr) as RepoMetadata;
  repoFileContent.owner = owner;
  repoFileContent.repo = repo;

  Object.assign(repoFileContent, overrides || {});

  // Check if we have a matching author aready
  if (!authorExists(owner)) {
    await addGithubAuthor(owner);
  }

  // We check again to see if we skipped the author or not
  if (authorExists(owner)) {
    repoFileContent.authorIds = [normalizeAuthorId(owner)];
  } else {
    repoFileContent.authorIds = [];
  }

  // Get the name of the README file
  if (!repoFileContent.content) {
    const readmePath = await getRepoReadme(owner, repo);
    if (readmePath) {
      repoFileContent.content = readmePath;
    }
  }

  const repoId = projectId || `${owner}-${repo}`;
  const repoFilePath = path.join(
    getConfigDir(),
    product,
    "repos",
    `${repoId}.json`
  );
  writeOrUpdateJSON(repoFilePath, repoFileContent);

  return repoId;
}

export async function main(args: string[]) {
  if (args.length < 4) {
    console.error(
      "Missing required arguments:\nnpm run addproject <product> <url> [id]"
    );
    return;
  }

  const product = args[2];
  const projectUrl = args[3];
  const projectId = args.length >= 5 ? args[4] : undefined;

  console.log(`Product: ${product}`);
  console.log(`Project: ${projectUrl}`);

  if (projectUrl.includes("github.com")) {
    await addRepo(product, projectUrl, projectId);
  } else if (projectUrl.includes("medium.com")) {
    await addMediumBlog(product, projectUrl, projectId);
  } else {
    await addOtherBlog(product, projectUrl, projectId);
  }
}

if (require.main === module) {
  main(process.argv);
}
