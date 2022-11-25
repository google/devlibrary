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

import * as cheerio from "cheerio";
import * as fs from "fs";
import fetch from "node-fetch";
import ogs from "open-graph-scraper";
import * as path from "path";

import { getConfigDir, writeOrUpdateJSON } from "./util";

// https://medium.com/@username
const RE_AUTHOR_AT = /https:\/\/medium\.com\/@([\w]+)/;

// https://username.medium.com
const RE_AUTHOR_SUBDOMAIN = /https:\/\/([\w]+)\.medium\.com/;

export function normalizeAuthorId(id: string) {
  // Replace all '.' with '-'
  return id.split(".").join("-").toLowerCase();
}

function authorFilePath(normalizedId: string) {
  return path.join(getConfigDir(), "authors", `${normalizedId}.json`);
}

export function authorExists(owner: string) {
  return fs.existsSync(authorFilePath(normalizeAuthorId(owner)));
}

function extractAuthorFromLink(href: string): string | undefined {
  const atMatch = href.match(RE_AUTHOR_AT);
  if (atMatch && atMatch.length >= 1) {
    return atMatch[1];
  }

  const subMatch = href.match(RE_AUTHOR_SUBDOMAIN);
  if (subMatch && subMatch.length >= 1) {
    return subMatch[1];
  }

  return undefined;
}

export async function getMediumPostAuthor(
  url: string
): Promise<string | undefined> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // As a primary, use the author link on the page
  const authorLink = $.root().find('link[rel="author"]');
  const href = authorLink?.attr("href");
  if (href) {
    return extractAuthorFromLink(href);
  }

  // As a backup, try the project URL
  return extractAuthorFromLink(url);
}

async function requestAuthorPage(
  username: string
): Promise<{ url: string; data: ogs.SuccessResult | ogs.ErrorResult }> {
  const urls = [
    `https://medium.com/@${username}`,
    `https://${username}.medium.com/`,
  ];

  return ogs({ url: urls[0] })
    .then((data) => ({ url: urls[0], data }))
    .catch(() => ogs({ url: urls[1] }).then((data) => ({ url: urls[1], data })))
    .catch((e) => {
      console.error(e);
      return Promise.reject(
        new Error(`Could not resolve any page for author ${username}`)
      );
    });
}

export async function addMediumAuthor(username: string) {
  const { url, data } = await requestAuthorPage(username);
  if (!data.result.success) {
    console.warn("Could not add author!");
    return;
  }

  const title = data.result.ogTitle || "";
  const photoURL =
    data.result.ogImage && "url" in data.result.ogImage
      ? data.result.ogImage.url.replace("/max/2400/", "/max/512/")
      : undefined;

  const author = {
    name: title.split(" – ")[0].trim(),
    bio: "",
    photoURL,
    mediumURL: url,
  };

  const authorId = normalizeAuthorId(username);
  const filePath = authorFilePath(authorId);
  writeOrUpdateJSON(filePath, author);
}

export async function addGithubAuthor(username: string) {
  // If available, use a GitHub token from the environment
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com/users/${username}`, {
    method: "get",
    headers,
  });
  const { name, bio, type } = await res.json();

  if (type === "Organization") {
    console.log("Skipping organization", username);
    return false;
  }

  const author = {
    name: name || username,
    bio: bio || "",
    photoURL: `https://avatars.githubusercontent.com/${username}`,
    githubURL: `https://github.com/${username}`,
  };

  const authorId = normalizeAuthorId(username);
  const filePath = authorFilePath(authorId);
  writeOrUpdateJSON(filePath, author);

  return true;
}

export async function main(args: string[]) {
  if (args.length < 4) {
    console.error(
      "Missing required arguments:\nnpm run addauthor <medium | github> <username>"
    );
    return;
  }

  const source = args[2];
  const username = args[3];

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

if (require.main === module) {
  main(process.argv);
}
