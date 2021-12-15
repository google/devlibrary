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

import { Octokit } from "@octokit/rest";
import fetch from "node-fetch";

import * as config from "./config";
import { getProjectId } from "./project";

export interface GitHubRepo {
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

let _gh: Octokit | undefined = undefined;

function gh(): Octokit {
  if (_gh === undefined) {
    _gh = new Octokit({
      auth: config.get("github", "token"),
    });
  }

  return _gh;
}

export async function getRepo(
  owner: string,
  repo: string
): Promise<GitHubRepo> {
  const res = await gh()
    .repos.get({
      owner,
      repo,
    })
    .catch((e) => {
      throw new Error(
        `Unable to get repo ${owner}/${repo}: ${JSON.stringify(e)}`
      );
    });

  return res.data;
}

export async function getRepoLicense(owner: string, repo: string) {
  try {
    const res = await gh().licenses.getForRepo({
      owner,
      repo,
    });

    const content = Buffer.from(res.data.content, res.data.encoding).toString();

    return {
      key: res.data.license?.key,
      content,
    };
  } catch (e) {
    console.warn(`Failed to get license for ${owner}/${repo}`, e);
    return {
      key: undefined,
      content: "",
    };
  }
}

export async function getDefaultBranch(
  owner: string,
  repo: string
): Promise<string> {
  const res = await gh().repos.get({
    owner,
    repo,
  });

  return res.data.default_branch;
}

export async function getFileContent(
  owner: string,
  repo: string,
  branch: string,
  path: string
): Promise<string> {
  const res = await gh()
    .repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    })
    .catch((e) => {
      throw new Error(
        `Unable to fetch file "${path}@${branch}" from "${owner}/${repo}": ${JSON.stringify(
          e
        )}`
      );
    });

  if (Array.isArray(res.data)) {
    throw new Error(
      `Can't get content of a directory: ${JSON.stringify(res.data)}`
    );
  }

  if (res.data.type !== "file") {
    throw new Error(
      `Invalid type ${res.data.type}: ${JSON.stringify(res.data)}`
    );
  }

  // See: https://github.com/octokit/rest.js/issues/1971
  const buffer = Buffer.from(
    (res.data as any).content,
    (res.data as any).encoding
  );
  return buffer.toString("utf-8");
}

export async function getEmojiMap(): Promise<Record<string, string>> {
  // We proxy this through our own function to reduce API calls
  const emojisUrl =
    process.env.FUNCTIONS_EMULATOR === "true"
      ? `http://localhost:5000/api/emojis`
      : `https://${getProjectId()}.web.app/api/emojis`;
  const res = await fetch(emojisUrl);

  // This is a map from emoji shortcode to image URL, for example:
  // 1st_place_medal: "https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8",
  // algeria: "https://github.githubassets.com/images/icons/emoji/unicode/1f1e9-1f1ff.png?v8",
  const urlMap = (await res.json()) as Record<string, string>;

  const map: Record<string, string> = {};

  for (const k of Object.keys(urlMap)) {
    const url = urlMap[k];
    if (!url.includes("/emoji/unicode/")) {
      continue;
    }

    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];
    const withoutExtension = lastSegment.split(".png")[0];

    const codepointStrings = withoutExtension.split("-");
    const codepoints = codepointStrings.map((str) => Number.parseInt(str, 16));
    const emoji = String.fromCodePoint(...codepoints);

    map[k] = emoji;
  }

  return map;
}

export async function getDirectoryContent(
  owner: string,
  repo: string,
  branch: string,
  path: string
): Promise<string[]> {
  const res = await gh().repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  });

  if (!Array.isArray(res.data)) {
    throw new Error(`Not a directory: ${JSON.stringify(res.data)}`);
  }

  return res.data.map((f) => {
    return f.path;
  });
}
