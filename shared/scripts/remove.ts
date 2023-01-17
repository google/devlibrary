/**
 * ----------------------------------------------------- *
 * - iterate through each json in config/[product]/repos/
 * - verify if https://github.com/[owner]/[repo] exists
 *   (check if page returns 404 status)
 * - delete corresponding repo json if not found

 * - take name of each json in config/authors/
 * - search through each json in config/[product]/[type]/
 * - verify if name exists in owner or authorIDs array
 * - delete corresponding author json if not found
 * ----------------------------------------------------- *
 */

import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import { getConfigDir } from "./util";

const dir = getConfigDir();

const confirmRepoDeleted = async (data: string) => {
  const { owner, repo } = JSON.parse(data);
  const url = "https://github.com/" + owner + "/" + repo;
  const res = await fetch(url);

  if (res.status === 404) return true;

  return false;
};

const jsons: string[] = [];
const products: string[] = [
  "android",
  "angular",
  "assistant",
  "cloud",
  "firebase",
  "flutter",
  "ml",
];

products.forEach((product: string) => {
  const repoDir = dir + "/" + product + "/repos";
  const files = fs.readdirSync(repoDir);
  files.map((file) => {
    const name = repoDir + "/" + file;
    jsons.push(name);
  });
});

jsons.forEach(async (json) => {
  const data = fs.readFileSync(json, "utf8");
  const repoDeleted = await confirmRepoDeleted(data);
  if (repoDeleted === true) {
    fs.unlink(json, (err) => {
      if (err) {
        throw err;
      }
      console.log("Deleted " + json + " successfully");
    });
    removeEmptyAuthors();
  }
});

const getAllFilesButAuthors = (
  dir = getConfigDir(),
  allFiles: string[] = []
) => {
  const files = fs.readdirSync(dir);
  files.map((file) => {
    const name = dir + "/" + file;
    if (fs.statSync(name).isDirectory()) {
      if (name !== "/Users/damb/devlibrary/config/authors") {
        getAllFilesButAuthors(name, allFiles);
      }
    } else {
      allFiles.push(name);
    }
  });
  
  return allFiles;
};

const retrieveEmptyAuthors = async (authors: string[], data: string) => {
  const object = JSON.parse(data);
  const authorIds = object.authorIds || [];
  const owner = (object.owner || "").toLowerCase();

  authorIds.forEach((authorId: string) => {
    if (authors.includes(authorId)) {
      authors.splice(authors.indexOf(authorId), 1);
    }
  });

  if (authors.includes(owner)) {
    authors.splice(authors.indexOf(owner), 1);
  }

  return authors;
};

const removeEmptyAuthors = () => {
  let authors: string[] = [];
  const authorsDir = dir + "/authors";
  const files = fs.readdirSync(authorsDir);
  files.map((file) => {
    authors.push(path.parse(file).name);
  });

  const allJsons = getAllFilesButAuthors().filter((file) =>
    file.endsWith(".json")
  );

  allJsons.forEach(async (json) => {
    const data = fs.readFileSync(json, "utf8");
    authors = await retrieveEmptyAuthors(authors, data);
  });

  authors.forEach((author: string) => {
    const jsonsToRemove = authorsDir + "/" + author + ".json";
    fs.unlink(jsonsToRemove, (err) => {
      if (err) {
        throw err;
      }
      console.log("Deleted " + jsonsToRemove + " successfully");
    });
  });
};

removeEmptyAuthors();
