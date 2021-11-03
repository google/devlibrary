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
import fetch from "node-fetch";
import { getConfigDir } from "./util";
import { RepoMetadata } from "../types/RepoMetadata";
import { parseGithubUrl } from "./addproject";
import { BlogMetadata } from "../types/BlogMetadata";

const ADVOCU_METADATA_FILE_NAME = "advocu.json";

const API_HOST = "https://api-devlibrary-stage.k8s01.nexo.zone";
const PATH_GET_APPLICATIONS = "/public/applications";

function exitWithError(msg: string, code = 1) {
  console.error(msg);
  process.exit(code);
}

type NonEmptyArray<T> = [T, ...T[]];

interface AdvocuMetadata {
  lastPullTime: number;
}

enum ApplicationStatus {
  SUBMITTED = "SUBMITTED",
  CONTENT_VERIFICATION_REJECTED = "CONTENT_VERIFICATION_REJECTED",
  CONTENT_VERIFICATION_APPROVED = "CONTENT_VERIFICATION_APPROVED",
}

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  steps: {
    contentVerification: {
      status: "pending" | "approved";
      dates: {
        start: string | null;
        review: string | null;
        overdue: string | null;
      };
    };
  };
  productCategory: string;
  blogPost: {
    url: string;
    description: string;
  } | null;
  github: {
    repositoryUrl: string;
    profileUrls: string[];
    projectName: string;
    licenseConfirmation: boolean;
    description: string;
    linkToReadme: string;
  } | null;
  tags: string[];
}

function assertNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0;
}

function applicationToRepoMetadata(a: Application): RepoMetadata {
  if (!a.github) {
    throw new Error(`Application ${a.id} does not have 'github' field`);
  }

  if (!assertNonEmpty(a.tags)) {
    throw new Error(`Application ${a.id} has empty 'tags' field`);
  }

  const { owner, repo } = parseGithubUrl(a.github.repositoryUrl);

  // TODO: Author IDs
  // TODO: The description should not be direct from GitHub
  // TODO: Where do we get the main content URL
  return {
    owner,
    repo,
    name: a.github.projectName,
    shortDescription: a.github.description,
    longDescription: a.github.description,
    content: "README.md",
    tags: a.tags,
  };
}

function applicationToBlogMetadata(a: Application): BlogMetadata {
  if (!a.blogPost) {
    throw new Error(`Application ${a.id} does not have 'blogPost' field`);
  }

  if (!assertNonEmpty(a.tags)) {
    throw new Error(`Application ${a.id} has empty 'tags' field`);
  }

  // TODO: Author IDs
  return {
    author: `${a.firstName} ${a.lastName}`,
    title: a.blogPost.description,
    link: a.blogPost.url,
    tags: a.tags,
  };
}

export async function main() {
  const advocuToken = process.env.ADVOCU_TOKEN;
  if (!advocuToken) {
    exitWithError("Error: must set 'ADVOCU_TOKEN' environment variable");
  }

  const advocuMetadataPath = path.join(
    getConfigDir(),
    ADVOCU_METADATA_FILE_NAME
  );
  const advocuMetadata = JSON.parse(
    fs.readFileSync(advocuMetadataPath).toString()
  ) as AdvocuMetadata;

  const lastPullDate = new Date(advocuMetadata.lastPullTime);
  console.log(`Last pull: ${lastPullDate.toISOString()}`);

  const url = `${API_HOST}${PATH_GET_APPLICATIONS}?status=${ApplicationStatus.CONTENT_VERIFICATION_APPROVED}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${advocuToken}`,
    },
  });

  // TODO: Do this filtering in the API
  const applications = (await res.json()) as Application[];
  const newApplications = applications.filter((a) => {
    const reviewDate = a.steps.contentVerification.dates.review;
    if (!reviewDate) {
      return false;
    }

    return new Date(reviewDate).getTime() > lastPullDate.getTime();
  });
  console.log(`New items: ${newApplications.length}`);

  for (const a of newApplications) {
    if (a.github) {
      console.log(applicationToRepoMetadata(a));
    }

    if (a.blogPost) {
      console.log(applicationToBlogMetadata(a));
    }
  }

  // TODO:
  // Add all projects
  // Add all authors
  // Update config metadata file with newest timestamp
  // Give the 'git commit' command

  // Other TODO:
  // Docs
  // Home link
}

if (require.main === module) {
  main();
}
