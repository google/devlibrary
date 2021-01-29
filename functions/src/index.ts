import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { loadProjectMetadata } from "./metadata";
import { loadBlogStats, loadGithubStats } from "./stats";
import { saveBlogData, saveGitHubProject } from "./firestore";

admin.initializeApp();

// TODO: This should not be a public HTTP function, should be a cron
export const refreshProjects = functions.https.onRequest(
  async (request, response) => {
    const { repos, blogs } = await loadProjectMetadata("firebase");

    for (const [id, metadata] of Object.entries(repos)) {
      const stats = await loadGithubStats(metadata);
      const repo = {
        id,
        metadata,
        stats,
      };

      // TODO: Batch this!
      await saveGitHubProject("firebase", repo);
    }

    for (const [id, metadata] of Object.entries(blogs)) {
      const stats = await loadBlogStats(metadata);
      const blog = {
        id,
        metadata,
        stats,
      };

      // TODO: Batch this!
      await saveBlogData("firebase", blog);
    }

    response.json({ status: "ok" });
  }
);
