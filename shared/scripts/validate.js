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

const fs = require("fs");
const path = require("path");
const Validator = require("jsonschema").Validator;

const BlogMetadataSchema = require("../schema/BlogMetadata.json");
const RepoMetadataSchema = require("../schema/RepoMetadata.json");
const AuthorMetadataSchema = require("../schema/AuthorMetadata.json");

const v = new Validator();
v.addSchema(BlogMetadataSchema, "BlogMetadata");
v.addSchema(RepoMetadataSchema, "RepoMetadata");
v.addSchema(AuthorMetadataSchema, "AuthorMetadata");

function validateObj(fPath, schema) {
  const fContent = fs.readFileSync(fPath).toString();
  if (fContent.includes("TODO")) {
    console.warn(`  x ${fPath} contains a 'TODO', did you forget to fill in the template?`);
    process.exit(1);
  }

  const obj = JSON.parse(fContent);
  const res = v.validate(obj, schema);

  if (res.valid) {
    console.log(`  ✓ ${fPath}`);
  } else {
    console.warn(`  x ${fPath} is not valid!`);
    for (const e of res.errors) {
      console.warn(`  ${e.property}: ${e.message}`);
    }
    process.exit(1);
  }
}

async function main() {
  const dir = path.dirname(__filename);
  const configDir = path.resolve(dir, "../../config");

  const authorsDir = path.join(configDir, "authors");
  console.log(`\nValidating authors`);
  const authorFiles = fs.readdirSync(authorsDir);
  for (const f of authorFiles) {
    const fPath = path.join(authorsDir, f);
    validateObj(fPath, AuthorMetadataSchema);
  }

  const productDirs = fs.readdirSync(configDir);
  for (const product of productDirs) {
    if (!fs.lstatSync(path.join(configDir, product)).isDirectory()) {
      continue;
    }
   
    const productBlogsDir = path.join(configDir, product, "blogs");
    if (fs.existsSync(productBlogsDir)) {
      console.log(`\nValidating blogs for ${product}`);
      const productBlogFiles = fs.readdirSync(productBlogsDir);
      for (const f of productBlogFiles) {
        const fPath = path.join(productBlogsDir, f);
        validateObj(fPath, BlogMetadataSchema);
      }
    }

    const productReposDir = path.join(configDir, product, "repos");
    if (fs.existsSync(productReposDir)) {
      console.log(`\nValidating repos for ${product}`);
      const productRepoFiles = fs.readdirSync(productReposDir);
      for (const f of productRepoFiles) {
        const fPath = path.join(productReposDir, f);
        validateObj(fPath, RepoMetadataSchema);
      }
    }
  }
}

main();
