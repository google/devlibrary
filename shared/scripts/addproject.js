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

const { addGithubAuthor, addMediumAuthor, getMediumPostAuthor } = require("./addauthor");

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

function writeOrUpdateJSON(path, content) {
  let newContent = content;
  if (fs.existsSync(path)) {
    console.log("Updating file:", path);
    const existingContent = JSON.parse(fs.readFileSync(path, 'utf-8'));
    newContent = {
      ...newContent,
      ...existingContent,
    }
  } else {
    console.log("Writing new file:", path);
  }

  fs.writeFileSync(path, JSON.stringify(newContent, undefined, 2));
}

async function addBlog(product, projectUrl) {
  const re = /medium.com\/([\w\-]+)\/([\w\-]+)/
  const m = projectUrl.match(re);

  const slug = m[2];

  const templateStr = fs.readFileSync(path.join(getConfigDir(), "template-blog.json")).toString();
  const blogFileContent = JSON.parse(templateStr);
  blogFileContent.link = projectUrl;

  // Add the author
  const postAuthor = await getMediumPostAuthor(projectUrl);
  const authorFilePath = path.join(getConfigDir(), `${postAuthor}.json`);
  if (!fs.existsSync(authorFilePath)) {
    await addMediumAuthor(postAuthor);
  }
  blogFileContent.authorIds = postAuthor ? [postAuthor] : [];

  const blogFilePath = path.join(getConfigDir(), product, 'blogs', `${slug}.json`);
  writeOrUpdateJSON(blogFilePath, blogFileContent);
}

async function addRepo(product, projectUrl) {
  const re = /github.com\/([\w\-]+)\/([\w\-]+)/
  const m = projectUrl.match(re);

  const owner = m[1];
  const repo = m[2];

  const templateStr = fs.readFileSync(path.join(getConfigDir(), "template-repo.json")).toString();
  const repoFileContent = JSON.parse(templateStr);
  repoFileContent.owner = owner;
  repoFileContent.repo = repo;

  // Check if we have a matching author aready
  const authorFilePath = path.join(getConfigDir(), `${owner}.json`);
  if (!fs.existsSync(authorFilePath)) {
    await addGithubAuthor(owner);
  }
  repoFileContent.authorIds = [owner];

  const repoFilePath = path.join(getConfigDir(), product, 'repos', `${owner}-${repo}.json`);
  writeOrUpdateJSON(repoFilePath, repoFileContent);
}

async function main(args) {
  if (args.length < 3) {
    console.error("Missing required arguments:\nnpm run addproject <product> <url>");
    return;
  }
  
  const product = args[1];
  const projectUrl = args[2];

  console.log(`Product: ${product}`);
  console.log(`Project: ${projectUrl}`);

  if (projectUrl.includes("github.com")) {
    await addRepo(product, projectUrl);
  } else if (projectUrl.includes("medium.com")) {
    await addBlog(product, projectUrl);
  } else {
    console.error("Unknown project source, must be a GitHub repo or Medium post");
  }
}

module.exports = {
  main
}
