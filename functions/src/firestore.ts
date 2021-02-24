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

export async function listProjectIds(product: string) {
  const db = admin.firestore();
  const blogsRef = db.collection("products").doc(product).collection("blogs");
  const reposRef = db.collection("products").doc(product).collection("repos");

  const getIdSet = async (ref: admin.firestore.Query) => {
    const snap = await ref.get();
    const ids = snap.docs.map((d) => d.id);
    return ids;
  };

  const blogs = await getIdSet(blogsRef);
  const repos = await getIdSet(reposRef);

  return {
    blogs,
    repos,
  };
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

async function deepDelete(ref: admin.firestore.DocumentReference) {
  const collections = await ref.listCollections();
  for (const collRef of collections) {
    const snap = await collRef.get();
    for (const d of snap.docs) {
      console.log(`Deleting ${d.ref.path}`);
      await d.ref.delete();
    }
  }

  console.log(`Deleting ${ref.path}`);
  await ref.delete();
}

export async function deleteRepoData(product: string, id: string) {
  const ref = repoRef(product, id);
  await deepDelete(ref);
}

export async function deleteBlogData(product: string, id: string) {
  const ref = blogRef(product, id);
  await deepDelete(ref);
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
