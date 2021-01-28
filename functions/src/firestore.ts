import * as admin from "firebase-admin";
import { BlogData, GitHubProject } from "../../shared/types";

export async function saveGitHubProject(product: string, project: GitHubProject) {
  const db = admin.firestore();

  const repoKey = `${project.metadata.owner}::${project.metadata.repo}`;
  const ref = db.collection("products").doc(product).collection("repos").doc(repoKey);

  await ref.set(project);
}

export async function saveBlogData(product: string, blog: BlogData) {
  const db = admin.firestore();

  // TODO: Better system
  const linkSegments = blog.metadata.link.split('/');
  const blogKey = linkSegments[linkSegments.length - 1];
  const ref = db.collection("products").doc(product).collection("blogs").doc(blogKey);

  await ref.set(blog);
}
