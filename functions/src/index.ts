import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { loadProjectMetadata } from "./metadata";
import { loadBlogStats, loadGithubStats } from "./stats";
import { saveBlogData, saveGitHubProject } from "./firestore";

admin.initializeApp();

// TODO: This should not be a public HTTP function, should be a cron
export const refreshProjects = functions.https.onRequest(async (request, response) => {
  const metadata = await loadProjectMetadata("firebase");
  
  for (const m of metadata.repos) {
    const stats = await loadGithubStats(m);
    const repo = {
      metadata: m,
      stats
    };

    // TODO: Batch this!
    await saveGitHubProject("firebase", repo);
  }

  for (const m of metadata.blogs) {
    const stats = await loadBlogStats(m);
    const blog = {
      metadata: m,
      stats
    };

    // TODO: Batch this!
    await saveBlogData("firebase", blog);
  }

  response.json({ status: 'ok' });
});
