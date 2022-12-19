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

import {
  AuthorData,
  BlogData,
  BlogDataHolder,
  BlogOrRepoDataHolder,
  RepoData,
  RepoDataHolder,
  RepoPage,
  SearchResult,
} from "../../../shared/types";

import {
  FirestoreQuery,
  QueryResult,
  QueryResultDocument,
} from "../../../shared/types/FirestoreQuery";
import { hostingRoot } from "./firebase";

// eslint-disable-next-line
const lodashGet = require("lodash.get");

// Saving all authors to avoid multiple db requests
let allAuthors: QueryResult<AuthorData>;

export interface PagedResponse<T> {
  collectionPath: string;
  q: FirestoreQuery;
  perPage: number;
  pages: T[][];
  currentPage: number;
  hasNext: boolean;
  lastDoc: QueryResultDocument<T> | null;
}

export function getApiHost(): string {
  // In development the hosting emulator runs at port 5000
  // while the Vue dev server runs elsewhere. In prod this is
  // not an issue
  return window.location.hostname === "localhost"
    ? `http://localhost:5000`
    : hostingRoot();
}

async function fetchDoc(docPath: string): Promise<object | undefined> {
  const params = new URLSearchParams({
    path: docPath,
  });

  const res = await fetch(`${getApiHost()}/api/docProxy?${params.toString()}`);
  if (!res.ok) {
    return undefined;
  }
  return await res.json();
}

async function fetchQuery(collectionPath: string, q: FirestoreQuery) {
  const params = new URLSearchParams({
    path: collectionPath,
    // The unescape() and encodeURIComponent() deal with UTF-8
    q: btoa(unescape(encodeURIComponent(JSON.stringify(q)))),
  });

  const res = await fetch(
    `${getApiHost()}/api/queryProxy?${params.toString()}`
  );
  return await res.json();
}

export async function elasticSearch(q: string): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q,
  });

  const res = await fetch(
    `${getApiHost()}/api/elasticSearch?${params.toString()}`
  );
  return (await res.json()) as SearchResult[];
}

export function emptyPageResponse<T>(
  collectionPath: string,
  q: FirestoreQuery,
  perPage: number
): PagedResponse<T> {
  return {
    collectionPath,
    q,
    perPage,
    pages: [],
    currentPage: -1,
    hasNext: false,
    lastDoc: null,
  };
}

export async function prevPage<T>(res: PagedResponse<T>) {
  res.currentPage = Math.max(0, res.currentPage - 1);
}

export async function nextPage<T>(res: PagedResponse<T>) {
  // TODO: Make a proper deep copy
  const q: FirestoreQuery = JSON.parse(JSON.stringify(res.q));

  // Add orderBy
  q.orderBy = q.orderBy || [];

  // Add the startAfter clauses
  if (res.lastDoc != null) {
    // Add one startAfter per orderBy
    // eslint-disable-next-line
    const startAfter: any[] = [];
    for (const ob of q.orderBy) {
      const fieldVal = lodashGet(res.lastDoc.data, ob.fieldPath);
      startAfter.push(fieldVal);
    }

    // Add a secondary order on name
    q.orderBy.push({
      fieldPath: "__name__",
      direction: "desc",
    });
    startAfter.push(res.lastDoc.id);

    q.startAfter = startAfter;
  }

  // Load one more than the limit to see if we have anything more
  // beyond the minimum
  q.limit = res.perPage + 1;

  const json = await fetchQuery(res.collectionPath, q);
  const { docs } = json as QueryResult<T>;

  // If we were able to find more than the per-page minimum, there
  // is still more after this
  res.hasNext = docs.length > res.perPage;

  if (res.hasNext) {
    // If there are more pages after this then we need to
    // chop off the extra one we loaded (see above) and then add the data
    const lastDoc = docs[docs.length - 2];
    const pageData = docs.slice(0, docs.length - 1).map((d) => d.data);

    res.lastDoc = lastDoc;
    res.pages.push(pageData);
  } else {
    // If this is the last page, just add the data (if it exists)
    // and accept the last snapshot
    if (docs.length > 0) {
      const pageData = docs.map((d) => d.data);
      res.pages.push(pageData);
    }

    res.lastDoc = docs[docs.length - 1];
  }

  // Finally increment the page
  res.currentPage = res.currentPage + 1;
}

export async function fetchAuthor(id: string): Promise<AuthorData | undefined> {
  // We are case insensitive on Author IDs in URL paths
  const normalizedId = id.toLowerCase();
  const authorPath = `/authors/${normalizedId}`;
  const json = await fetchDoc(authorPath);
  if (json) {
    return json as AuthorData;
  }
}

export async function fetchRepo(
  product: string,
  id: string
): Promise<RepoData | undefined> {
  const repoPath = `/products/${product}/repos/${id}`;
  const json = await fetchDoc(repoPath);
  if (json) {
    return json as RepoData;
  }
}

export async function fetchBlog(
  product: string,
  id: string
): Promise<BlogData | undefined> {
  const repoPath = `/products/${product}/blogs/${id}`;
  const json = await fetchDoc(repoPath);

  if (json) {
    return json as BlogData;
  }
}

export async function fetchRepoPage(
  product: string,
  id: string,
  pageKey: string
): Promise<RepoPage | undefined> {
  const pagePath = `/products/${product}/repos/${id}/pages/${pageKey}`;
  const json = await fetchDoc(pagePath);
  if (json) {
    return json as RepoPage;
  }
}

export async function queryAuthors(
  q: FirestoreQuery
): Promise<QueryResult<AuthorData>> {
  const collectionPath = `/authors`;
  const json = await fetchQuery(collectionPath, q);
  allAuthors = json as QueryResult<AuthorData>;
  return json as QueryResult<AuthorData>;
}

export async function queryBlogs(
  product: string,
  q: FirestoreQuery
): Promise<QueryResult<BlogData>> {
  const collectionPath = `/products/${product}/blogs`;
  const json = await fetchQuery(collectionPath, q);
  return json as QueryResult<BlogData>;
}

export async function queryRepos(
  product: string,
  q: FirestoreQuery
): Promise<QueryResult<RepoData>> {
  const collectionPath = `/products/${product}/repos`;
  const json = await fetchQuery(collectionPath, q);
  return json as QueryResult<RepoData>;
}

export async function queryAuthorProjects(authorId: string) {
  const normalizedId = authorId.toLowerCase();
  const q: FirestoreQuery = {
    scope: "COLLECTION_GROUP",
    where: [
      {
        fieldPath: "metadata.authorIds",
        operator: "array-contains",
        value: normalizedId,
      },
    ],
    orderBy: [
      {
        fieldPath: "stats.lastUpdated",
        direction: "desc",
      },
    ],
  };

  const blogs = (await fetchQuery("blogs", q)) as QueryResult<BlogData>;
  const repos = (await fetchQuery("repos", q)) as QueryResult<RepoData>;
  return {
    blogs,
    repos,
  };
}

export async function queryAuthorsByProduct(
  products: string[]
): Promise<QueryResult<AuthorData>> {
  const authorResults: any = [];
  for (const author of allAuthors.docs) {
    const res = await queryAuthorProjects(author.id);

    const blogProducts: string[] = [];
    const repoProducts: string[] = [];

    Object.keys(res.blogs.docs).forEach((blogIndex) => {
      blogProducts.push(res.blogs.docs[Number(blogIndex)].data.product);
    });

    Object.keys(res.repos.docs).forEach((repoIndex) => {
      repoProducts.push(res.repos.docs[Number(repoIndex)].data.product);
    });

    if (products.every((repo) => repoProducts.includes(repo))) {
      authorResults.push(author);
    }
    if (products.every((blog) => blogProducts.includes(blog))) {
      authorResults.push(author);
    }
  }
  return authorResults as QueryResult<AuthorData>;
}

/**
 * See: https://stackoverflow.com/a/2450976/324977
 */
export function shuffleArr<T>(arr: T[]): T[] {
  let currentIndex = arr.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const tmp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tmp;
  }

  return arr;
}

export function wrapInHolders(
  blogs: BlogData[],
  repos: RepoData[]
): BlogOrRepoDataHolder[] {
  const blogHolders: BlogDataHolder[] = blogs.map((data) => {
    return { type: "blog", data };
  });

  const repoHolders: RepoDataHolder[] = repos.map((data) => {
    return { type: "repo", data };
  });

  return [...blogHolders, ...repoHolders];
}
