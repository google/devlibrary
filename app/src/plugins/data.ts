import { BlogData, RepoData, RepoPage } from "../../../shared/types";
import { firestore } from "./firebase";

import firebase from "firebase";

export interface PagedResponse<T> {
  q: firebase.firestore.Query<T>;
  perPage: number;
  pages: T[][];
  currentPage: number;
  hasNext: boolean;
  lastDoc: firebase.firestore.QueryDocumentSnapshot | null;
}

export async function getDocs<T>(query: firebase.firestore.Query<T>) {
  const snap = await query.get();

  const snapshots = snap.docs;
  const data = snap.docs.map((d) => d.data());
  return { snapshots, data };
}

export function reposRef(product: string) {
  return firestore()
    .collection("products")
    .doc(product)
    .collection("repos")
    .withConverter({
      toFirestore: (obj: RepoData) => obj,
      fromFirestore: (snap) => snap.data() as RepoData,
    });
}

export function reposQuery(product: string) {
  return reposRef(product) as firebase.firestore.Query<RepoData>;
}

export function blogsRef(product: string) {
  return firestore()
    .collection("products")
    .doc(product)
    .collection("blogs")
    .withConverter({
      toFirestore: (obj: BlogData) => obj,
      fromFirestore: (snap) => snap.data() as BlogData,
    });
}

export function blogsQuery(product: string) {
  return blogsRef(product) as firebase.firestore.Query<BlogData>;
}

export function emptyPageResponse<T>(
  q: firebase.firestore.Query<T>,
  perPage: number
): PagedResponse<T> {
  return {
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
  // Fetch the next page based on the limit and startAfter
  let q = res.q;
  if (res.lastDoc) {
    q = q.startAfter(res.lastDoc);
  }

  // Load one more than the limit to see if we have anything more
  // beyond the minimum
  q = q.limit(res.perPage + 1);

  const { data, snapshots } = await getDocs(q);

  // If we were able to find more than the per-page minimum, there
  // is still more after this
  res.hasNext = data.length > res.perPage;

  if (res.hasNext) {
    // If there are more pages after this then we need to
    // chop off the extra one we loaded (see above) and then add the data
    const lastDoc = snapshots[snapshots.length - 2];
    const pageData = data.slice(0, data.length - 1);

    res.lastDoc = lastDoc;
    res.pages.push(pageData);
  } else {
    // If this is the last page, just add the data (if it exists)
    // and accept the last snapshot
    if (data.length > 0) {
      res.pages.push(data);
    }

    res.lastDoc = snapshots[snapshots.length - 1];
  }

  // Finally increment the page
  res.currentPage = res.currentPage + 1;
}

export async function fetchRepo(
  product: string,
  id: string
): Promise<RepoData> {
  const ref = reposRef(product).doc(id);

  const snap = await ref.get();
  return snap.data() as RepoData;
}

export async function fetchRepoPage(
  product: string,
  id: string,
  pageKey: string
): Promise<RepoPage> {
  const ref = reposRef(product).doc(id).collection("pages").doc(pageKey);

  const snap = await ref.get();
  return snap.data() as RepoPage;
}
