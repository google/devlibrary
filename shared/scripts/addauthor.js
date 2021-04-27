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
const fetch = require("node-fetch");
const ogs = require('open-graph-scraper');

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

async function addMediumAuthor(username) {
  const options = {
    url: `https://medium.com/@${username}`
  };
  
  const { result } = await ogs(options);
  if (!result.success) {
    console.warn("Could not add author!");
    return;
  }

  const title = result.ogTitle;
  const imageUrl = result.ogImage.url;

  const author = {
    name: title.split(" – ")[0].trim(),
    bio: "",
    photoURL: imageUrl,
    mediumURL: options.url
  };

  const authorFilePath = path.join(getConfigDir(), 'authors', `${username}.json`);
  
  console.log(`Writing new file: ${authorFilePath}`);
  fs.writeFileSync(authorFilePath, JSON.stringify(author, undefined, 2));
}

async function addGithubAuthor(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const { name, bio } = await res.json();

  const author = {
    name: name || username,
    bio: bio || "",
    photoURL: `https://avatars.githubusercontent.com/${username}`,
    githubURL: `https://github.com/${username}`
  }

  const authorFilePath = path.join(getConfigDir(), 'authors', `${username}.json`);
  
  console.log(`Writing new file: ${authorFilePath}`);
  fs.writeFileSync(authorFilePath, JSON.stringify(author, undefined, 2));
}

async function main() {
  if (process.argv.length < 4) {
    console.error("Missing required arguments:\nnpm run addauthor <medium | github> <username>");
    return;
  }
  
  const source = process.argv[2];
  const username = process.argv[3];

  if (source === "github") {
    console.log(`GitHub username: ${username}`);
    await addGithubAuthor(username);
  } else if (source === "medium") {
    console.log(`Medium username: ${username}`);
    await addMediumAuthor(username);
  } else {
    console.warn(`Unknown source: ${source}`);
  }
}

main();
