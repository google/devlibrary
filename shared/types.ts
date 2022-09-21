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

export enum ProductKey {
  ANDROID = "android",
  ANGULAR = "angular",
  CLOUD = "cloud",
  FIREBASE = "firebase",
  FLUTTER = "flutter",
  ML = "ml",
  ASSISTANT = "assistant",
}

export interface ProductTag {
  // The human-readable name (Android, Node.js)
  label: string;

  // The database value (android, node)
  value: string;
}

export interface ProductConfig {
  key: ProductKey;
  name: string;
  description: string;
  docsUrl: string;
  tags: ProductTag[];
}

import { AuthorMetadata } from "./types/AuthorMetadata";
/**
 * These two types are defined in JSON schema so that we can validate them easily.
 */
import { BlogMetadata } from "./types/BlogMetadata";
import { RepoMetadata } from "./types/RepoMetadata";

export interface RepoStats {
  stars: number;
  forks: number;
  dateAdded: number;
  lastUpdated: number;
}

export interface RepoData {
  id: string;
  product: string;
  metadata: RepoMetadata;
  stats: RepoStats;
}

export interface RepoPageSection {
  name: string;
  content: string;
}

export interface RepoPage {
  name: string;
  path: string;
  sections: RepoPageSection[];
}

export interface BlogStats {
  minutes: number;
  claps: number;
  dateAdded: number;
  lastUpdated: number;
}

export interface BlogData {
  id: string;
  product: string;
  metadata: BlogMetadata;
  stats: BlogStats;
}

export interface AuthorData {
  id: string;
  metadata: AuthorMetadata;
}

export interface BlogSearchResult {
  type: "blog";
  score: number;
  data: {
    id: string;
    product: string;
    metadata: BlogMetadata;
  };
}

export interface RepoSearchResult {
  type: "repo";
  score: number;
  data: {
    id: string;
    product: string;
    metadata: RepoMetadata;
  };
}

export interface AuthorSearchResult {
  type: "author";
  score: number;
  data: {
    id: string;
    metadata: AuthorMetadata;
  };
}

export type SearchResult =
  | BlogSearchResult
  | RepoSearchResult
  | AuthorSearchResult;

export interface BlogDataHolder {
  type: "blog";
  data: BlogData;
}

export interface RepoDataHolder {
  type: "repo";
  data: RepoData;
}

export type BlogOrRepoDataHolder = BlogDataHolder | RepoDataHolder;

export interface BreadcrumbLink {
  name: string;
  path: string;
}
