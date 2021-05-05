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

const {
  addGithubAuthor,
  addMediumAuthor,
  getMediumPostAuthor,
} = require("./addauthor");
const { writeOrUpdateJSON, getConfigDir } = require("./util");

async function addBlog(product, projectUrl, projectId) {
  const re = /\.com\/([\w\-]+)\/([\w\-]+)/;
  const m = projectUrl.match(re);

  const templateStr = fs
    .readFileSync(path.join(getConfigDir(), "template-blog.json"))
    .toString();
  const blogFileContent = JSON.parse(templateStr);
  blogFileContent.link = projectUrl;

  // Add the author
  // TODO: This doesn't work for proandroiodev, etc
  const postAuthor = await getMediumPostAuthor(projectUrl);
  if (postAuthor) {
    const authorFilePath = path.join(getConfigDir(), "authors", `${postAuthor}.json`);
    if (!fs.existsSync(authorFilePath)) {
      await addMediumAuthor(postAuthor);
    }
  }
  blogFileContent.authorIds = postAuthor ? [postAuthor] : [];

  const blogId = projectId || m[2];
  const blogFilePath = path.join(
    getConfigDir(),
    product,
    "blogs",
    `${blogId}.json`
  );
  writeOrUpdateJSON(blogFilePath, blogFileContent);
}

async function addRepo(product, projectUrl, projectId) {
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

  // Check if we have a matching author aready
  const authorFilePath = path.join(getConfigDir(), "authors", `${owner}.json`);
  if (!fs.existsSync(authorFilePath)) {
    await addGithubAuthor(owner);
  }

  // We check again to see if we skipped the author or not
  if (fs.existsSync(authorFilePath)) {
    repoFileContent.authorIds = [owner];
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
    await addBlog(product, projectUrl, projectId);
  } else {
    console.error(
      "Unknown project source, must be a GitHub repo or Medium post"
    );
  }
}

module.exports = {
  main,
  addBlog,
  addRepo,
};
