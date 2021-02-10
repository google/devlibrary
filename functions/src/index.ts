import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { loadProjectMetadata } from "./metadata";
import { loadBlogStats, loadRepoStats } from "./stats";
import { saveBlogData, saveRepoData, saveRepoPage } from "./firestore";

import * as content from "./content";
import * as github from "./github";

import { RepoPage } from "../../shared/types";

admin.initializeApp();

// TODO: This should not be a public HTTP function, should be a cron
export const refreshProjects = functions.https.onRequest(
  async (request, response) => {
    // TODO: Iterate over each product
    const product = "firebase";

    const { repos, blogs } = await loadProjectMetadata(product);

    for (const [id, metadata] of Object.entries(blogs)) {
      const stats = await loadBlogStats(metadata);
      const blog = {
        id,
        metadata,
        stats,
      };

      await saveBlogData(product, blog);
    }

    // TODO: This should probably fan out to another function
    for (const [id, metadata] of Object.entries(repos)) {
      // First save the repo metadata and stats
      const stats = await loadRepoStats(metadata);
      const repo = {
        id,
        metadata,
        stats,
      };
      await saveRepoData(product, repo);

      // Then save a document for each page
      const pages = [
        {
          name: "main",
          path: metadata.content,
        },
        ...(metadata.pages || []),
      ];

      const branch = await github.getDefaultBranch(
        metadata.owner,
        metadata.repo
      );

      for (const p of pages) {
        // Get Markdown from GitHub
        const md = await github.getFileContent(
          metadata.owner,
          metadata.repo,
          branch,
          p.path
        );

        // Render into a series of HTML "sections"
        const sections = content.renderContent(
          product,
          repo,
          p.path,
          md,
          branch
        );

        const data: RepoPage = {
          name: p.name,
          path: p.path,
          sections,
        };
        await saveRepoPage(product, repo, p.path, data);
      }
    }

    response.json({ status: "ok" });
  }
);
