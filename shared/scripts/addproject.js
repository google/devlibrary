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

const fs = require("fs");
const path = require("path");
const ogs = require("open-graph-scraper");

const {
  normalizeAuthorId,
  addGithubAuthor,
  addMediumAuthor,
  getMediumPostAuthor,
  mediumAuthorExists,
  githubAuthorExists,
} = require("./addauthor");
const { writeOrUpdateJSON, getConfigDir } = require("./util");

/**
 * @param {string} product
 * @param {string} projectUrl
 * @param {string | undefined} [projectId]
 * @param {object | undefined} [overrides]
 * @returns {string} the project ID
 */
async function addOtherBlog(product, projectUrl, projectId, overrides) {
  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-blog.json"))
    .toString();
  const blogFileContent = JSON.parse(templateStr);
  blogFileContent.source = "other";
  blogFileContent.link = projectUrl;

  Object.assign(blogFileContent, overrides || {});

  // Get the title from OpenGraph
  const { result } = await ogs({
    url: projectUrl,
  });
  if (result.success) {
    blogFileContent.title = result.ogTitle;
  }

  // Make a slug ID from the URL
  const u = new URL(projectUrl);
  const segments = u.pathname
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

/**
 * @param {string} product
 * @param {string} projectUrl
 * @param {string | undefined} [projectId]
 * @param {object | undefined} [overrides]
 * @returns {string} the project ID
 */
async function addMediumBlog(product, projectUrl, projectId, overrides) {
  const re = /\.com\/([\w\-\@\.]+)\/([\w\-]+)/;
  const m = projectUrl.match(re);

  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-blog.json"))
    .toString();
  const blogFileContent = JSON.parse(templateStr);
  blogFileContent.link = projectUrl;

  Object.assign(blogFileContent, overrides || {});

  // Add the author
  // TODO: This doesn't work for proandroiodev, etc
  const postAuthor = await getMediumPostAuthor(projectUrl);
  if (postAuthor) {
    if (!mediumAuthorExists(postAuthor)) {
      await addMediumAuthor(postAuthor);
    }
  }
  blogFileContent.authorIds = postAuthor ? [normalizeAuthorId(postAuthor)] : [];

  if (!(projectId || m)) {
    throw new Error(`Could not parse Medium URL: ${projectUrl}`);
  }

  const blogId = projectId || m[2];
  const blogFilePath = path.join(
    getConfigDir(),
    product,
    "blogs",
    `${blogId}.json`
  );
  writeOrUpdateJSON(blogFilePath, blogFileContent);

  return blogId;
}

/**
 * @param {string} product
 * @param {string} projectUrl
 * @param {string | undefined} [projectId]
 * @param {object | undefined} [overrides]
 * @returns {string} the project ID
 */
async function addRepo(product, projectUrl, projectId, overrides) {
  const re = /github.com\/([\w\-]+)\/([\w\-]+)/;
  const m = projectUrl.match(re);

  const owner = m[1];
  const repo = m[2];

  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-repo.json"))
    .toString();
  const repoFileContent = JSON.parse(templateStr);
  repoFileContent.owner = owner;
  repoFileContent.repo = repo;

  Object.assign(repoFileContent, overrides || {});

  // Check if we have a matching author aready
  if (!githubAuthorExists(owner)) {
    await addGithubAuthor(owner);
  }

  // We check again to see if we skipped the author or not
  if (githubAuthorExists(owner)) {
    repoFileContent.authorIds = [normalizeAuthorId(owner)];
  } else {
    repoFileContent.authorIds = [];
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

async function main(args) {
  if (args.length < 3) {
    console.error(
      "Missing required arguments:\nnpm run addproject <product> <url> [id]"
    );
    return;
  }

  const product = args[1];
  const projectUrl = args[2];
  const projectId = args.length >= 4 ? args[3] : undefined;

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

module.exports = {
  main,
  addMediumBlog,
  addOtherBlog,
  addRepo,
};
