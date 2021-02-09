import { BlogData, RepoData, RepoPage } from "../../../shared/types";
import { firestore } from "./firebase";

import firebase from "firebase";

export interface QueryParams {
  orderBy?: string;
  limit?: number;
}

export async function fetchRepos(
  product: string,
  query: QueryParams
): Promise<RepoData[]> {
  console.log("fetchRepos", product, query);

  // TODO: Order by recently
  const db = firestore();
  let ref: firebase.firestore.Query = db
    .collection("products")
    .doc(product)
    .collection("repos");

  if (query.limit) {
    ref = ref.limit(query.limit);
  }

  const snap = await ref.get();
  return snap.docs.map((d) => d.data() as RepoData);
}

export async function fetchBlogs(
  product: string,
  query: QueryParams
): Promise<BlogData[]> {
  console.log("fetchBlogs", product, query);

  // TODO: Order by recently
  const db = firestore();
  let ref: firebase.firestore.Query = db
    .collection("products")
    .doc(product)
    .collection("blogs");

  if (query.limit) {
    ref = ref.limit(query.limit);
  }

  const snap = await ref.get();
  return snap.docs.map((d) => d.data() as BlogData);
}

export async function fetchRepo(
  product: string,
  id: string
): Promise<RepoData> {
  const db = firestore();
  const ref = db
    .collection("products")
    .doc(product)
    .collection("repos")
    .doc(id);

  const snap = await ref.get();
  return snap.data() as RepoData;
}

export async function fetchRepoPage(
  product: string,
  id: string,
  pageKey: string
): Promise<RepoPage> {
  const db = firestore();
  const ref = db
    .collection("products")
    .doc(product)
    .collection("repos")
    .doc(id)
    .collection("pages")
    .doc(pageKey);

  const snap = await ref.get();
  return snap.data() as RepoPage;
}
