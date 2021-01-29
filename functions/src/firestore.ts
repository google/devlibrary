import * as admin from "firebase-admin";
import { BlogData, GitHubProject } from "../../shared/types";

export async function saveGitHubProject(
  product: string,
  project: GitHubProject
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
