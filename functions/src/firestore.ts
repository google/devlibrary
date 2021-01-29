import * as admin from "firebase-admin";
import { BlogData, RepoData } from "../../shared/types";

export async function saveRepoData(
  product: string,
  project: RepoData
) {
  const db = admin.firestore();
  const ref = db
    .collection("products")
    .doc(product)
    .collection("repos")
    .doc(project.id);

  await ref.set(project);
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
