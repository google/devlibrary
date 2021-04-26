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

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

async function addAuthor(username) {
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

function main() {
  if (process.argv.length < 3) {
    console.error("Missing required arguments:\nnpm run addauthor <github username>");
    return;
  }
  
  const username = process.argv[2];

  console.log(`GitHub username: ${username}`);
  addAuthor(username);
}

main();
