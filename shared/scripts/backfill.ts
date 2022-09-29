/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fs from "fs";
import * as path from "path";
import { addMediumBlog, addOtherBlog, addRepo } from "./addproject";
import { getConfigDir } from "./util";

export async function main() {
  const products = fs
    .readdirSync(getConfigDir())
    .filter((f) => f !== "authors")
    .filter((f) => fs.statSync(path.join(getConfigDir(), f)).isDirectory());

  for (const p of products) {
    const productDir = path.join(getConfigDir(), p);
    const reposDir = path.join(productDir, "repos");
    const blogsDir = path.join(productDir, "blogs");

    const repoFiles = fs
      .readdirSync(reposDir)
      .filter((f) => f.endsWith(".json"));
    for (const repoFile of repoFiles) {
      console.log(`[${p}] ${repoFile}`);

      const repoId = repoFile.split(".json")[0];
      const repoMetadata = JSON.parse(
        fs.readFileSync(path.join(reposDir, repoFile), "utf-8")
      );
      const repoLink = `https://github.com/${repoMetadata.owner}/${repoMetadata.repo}`;

      await addRepo(p, repoLink, repoId);
    }

    const blogFiles = fs
      .readdirSync(blogsDir)
      .filter((f) => f.endsWith(".json"));
    for (const blogFile of blogFiles) {
      console.log(`[${p}] ${blogFile}`);

      const blogId = blogFile.split(".json")[0];
      const blogMetadata = JSON.parse(
        fs.readFileSync(path.join(blogsDir, blogFile), "utf-8")
      );
      const blogLink = blogMetadata.link;

      if (blogMetadata.source === "medium") {
        await addMediumBlog(p, blogLink, blogId);
      } else {
        await addOtherBlog(p, blogLink, blogId);
      }
    }
  }
}

if (require.main === module) {
  main();
}
