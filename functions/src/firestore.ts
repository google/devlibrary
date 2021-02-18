import * as admin from "firebase-admin";
import { BlogData, RepoData, RepoPage } from "../../shared/types";
import { cleanPagePath } from "../../shared/util";

function repoRef(product: string, id: string) {
  const db = admin.firestore();
  return db.collection("products").doc(product).collection("repos").doc(id);
}

function blogRef(product: string, id: string) {
  const db = admin.firestore();
  return db.collection("products").doc(product).collection("blogs").doc(id);
}

export async function getRepoData(product: string, id: string) {
  const ref = repoRef(product, id);
  const snap = await ref.get();
  const data = snap.data();
  return data ? (data as RepoData) : undefined;
}

export async function getBlogData(product: string, id: string) {
  const ref = blogRef(product, id);
  const snap = await ref.get();
  const data = snap.data();
  return data ? (data as BlogData) : undefined;
}

export async function saveRepoData(product: string, project: RepoData) {
  const ref = repoRef(product, project.id);
  await ref.set(project);
}

export async function saveRepoPage(
  product: string,
  project: RepoData,
  page: string,
  data: RepoPage
) {
  const pageKey = Buffer.from(cleanPagePath(page)).toString("base64");
  const ref = repoRef(product, project.id).collection("pages").doc(pageKey);

  await ref.set(data);
}

export async function saveBlogData(product: string, blog: BlogData) {
  const ref = blogRef(product, blog.id);
  await ref.set(blog);
}
