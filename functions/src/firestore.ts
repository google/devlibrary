import * as admin from "firebase-admin";
import { BlogData, RepoData, RepoPage } from "../../shared/types";
import { cleanPagePath } from "../../shared/util";

export async function saveRepoData(product: string, project: RepoData) {
  const db = admin.firestore();
  const ref = db
    .collection("products")
    .doc(product)
    .collection("repos")
    .doc(project.id);

  await ref.set(project);
}

export async function saveRepoPage(
  product: string,
  project: RepoData,
  page: string,
  data: RepoPage
) {
  const db = admin.firestore();

  const pageKey = Buffer.from(cleanPagePath(page)).toString("base64");

  const ref = db
    .collection("products")
    .doc(product)
    .collection("repos")
    .doc(project.id)
    .collection("pages")
    .doc(pageKey);

  await ref.set(data);
}

export async function saveBlogData(product: string, blog: BlogData) {
  const db = admin.firestore();
  const ref = db
    .collection("products")
    .doc(product)
    .collection("blogs")
    .doc(blog.id);

  await ref.set(blog);
}
