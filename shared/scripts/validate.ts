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
import { Validator } from "jsonschema";

import { ALL_PRODUCTS } from "../product";
import { ProductConfig } from "../types";

import { AuthorMetadata } from "../types/AuthorMetadata";
import { BlogMetadata } from "../types/BlogMetadata";
import { RepoMetadata } from "../types/RepoMetadata";

const BlogMetadataSchema = require("../schema/BlogMetadata.json");
const RepoMetadataSchema = require("../schema/RepoMetadata.json");
const AuthorMetadataSchema = require("../schema/AuthorMetadata.json");

const v = new Validator();
v.addSchema(BlogMetadataSchema, "BlogMetadata");
v.addSchema(RepoMetadataSchema, "RepoMetadata");
v.addSchema(AuthorMetadataSchema, "AuthorMetadata");

function validateTags(
  fPath: string,
  metadata: RepoMetadata | BlogMetadata,
  product: ProductConfig
) {
  const tags = product.tags.map((t) => t.value);
  const invalid = metadata.tags.filter((t) => !tags.includes(t));

  // If none of the tags are valid, we error out
  if (invalid.length === metadata.tags.length) {
    console.warn(
      `  x ${fPath} does not have any valid tags. Valid tags for ${
        product.key
      } are: ${JSON.stringify(tags)}`
    );
    process.exit(1);
  }

  // If at least one tag is valid, we just warn
  if (invalid.length > 0 && invalid.length < metadata.tags.length) {
    console.warn(
      `  ! ${fPath} has some invalid tags :${JSON.stringify(
        metadata.tags
      )}. Valid tags for ${product.key} are: ${JSON.stringify(tags)}`
    );
  }
}

function validateObj<T>(fPath: string, schema: any): T | undefined {
  const fContent = fs.readFileSync(fPath).toString();
  if (fContent.includes("TODO")) {
    console.warn(
      `  x ${fPath} contains a 'TODO', did you forget to fill in the template?`
    );
    process.exit(1);
  }

  let obj;
  try {
    obj = JSON.parse(fContent);
  } catch (e) {
    console.warn(`  x ${fPath} is not valid JSON!`);
    process.exit(1);
  }

  const res = v.validate(obj, schema);
  if (!res.valid) {
    console.warn(`  x ${fPath} is not valid!`);
    for (const e of res.errors) {
      console.warn(`  ${e.property}: ${e.message}`);
    }
    process.exit(1);
  }

  console.log(`  ✓ ${fPath}`);
  return obj as T;
}

async function main() {
  const dir = path.dirname(__filename);
  const configDir = path.resolve(dir, "../../config");

  const authorsDir = path.join(configDir, "authors");
  console.log(`\nValidating authors`);
  const authorFiles = fs.readdirSync(authorsDir);
  for (const f of authorFiles) {
    const fPath = path.join(authorsDir, f);
    validateObj<AuthorMetadata>(fPath, AuthorMetadataSchema);
  }

  const productDirs = fs.readdirSync(configDir);
  for (const product of productDirs) {
    if (!fs.lstatSync(path.join(configDir, product)).isDirectory()) {
      continue;
    }

    const productConfig = ALL_PRODUCTS[product];

    const productBlogsDir = path.join(configDir, product, "blogs");
    if (fs.existsSync(productBlogsDir)) {
      console.log(`\nValidating blogs for ${product}`);
      const productBlogFiles = fs
        .readdirSync(productBlogsDir)
        .filter((f) => f.endsWith(".json"));
      for (const f of productBlogFiles) {
        const fPath = path.join(productBlogsDir, f);
        const metadata = validateObj<BlogMetadata>(fPath, BlogMetadataSchema);
        if (metadata) {
          validateTags(fPath, metadata, productConfig);
        }
      }
    }

    const productReposDir = path.join(configDir, product, "repos");
    if (fs.existsSync(productReposDir)) {
      console.log(`\nValidating repos for ${product}`);
      const productRepoFiles = fs
        .readdirSync(productReposDir)
        .filter((f) => f.endsWith(".json"));
      for (const f of productRepoFiles) {
        const fPath = path.join(productReposDir, f);
        const metadata = validateObj<RepoMetadata>(fPath, RepoMetadataSchema);
        if (metadata) {
          validateTags(fPath, metadata, productConfig);
        }
      }
    }
  }
}

if (require.main === module) {
  main();
}
