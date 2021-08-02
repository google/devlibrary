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
import { authorExists } from "./addauthor";

const BlogMetadataSchema = require("../schema/BlogMetadata.json");
const RepoMetadataSchema = require("../schema/RepoMetadata.json");
const AuthorMetadataSchema = require("../schema/AuthorMetadata.json");

const v = new Validator();
v.addSchema(BlogMetadataSchema, "BlogMetadata");
v.addSchema(RepoMetadataSchema, "RepoMetadata");
v.addSchema(AuthorMetadataSchema, "AuthorMetadata");

class ErrorCollector {
  constructor(private warnings: string[] = [], private errors: string[] = []) {}

  public addWarning(message: string) {
    this.warnings.push(message);
  }

  public addError(message: string) {
    this.errors.push(message);
  }

  public hasErrors() {
    return this.errors.length > 0;
  }

  public hasWarnings() {
    return this.warnings.length > 0;
  }

  public printSummary() {
    if (this.warnings.length > 0) {
      console.log(`Warnings (${this.warnings.length}):`);
      console.log("--------------------------");
      for (const msg of this.warnings) {
        console.log(`  ⚠ ${msg}`);
      }
      console.log();
    }

    if (this.errors.length > 0) {
      console.log(`Errors (${this.errors.length}):`);
      console.log("--------------------------");
      for (const msg of this.errors) {
        console.log(`  x ${msg}`);
      }
      console.log();
    }
  }
}

const collector = new ErrorCollector();

function validateTags(
  fPath: string,
  metadata: RepoMetadata | BlogMetadata,
  product: ProductConfig
) {
  const tags = product.tags.map((t) => t.value);
  const invalid = metadata.tags.filter((t) => !tags.includes(t));

  // If none of the tags are valid, we error out
  if (invalid.length === metadata.tags.length) {
    collector.addError(
      `${fPath} does not have any valid tags. Valid tags for ${
        product.key
      } are: ${JSON.stringify(tags)}`
    );
  }

  // If at least one tag is valid, we just warn
  if (invalid.length > 0 && invalid.length < metadata.tags.length) {
    collector.addWarning(
      `${fPath} has some invalid tags :${JSON.stringify(
        metadata.tags
      )}. Valid tags for ${product.key} are: ${JSON.stringify(tags)}`
    );
  }
}

function validateAuthor(fPath: string, metadata: RepoMetadata | BlogMetadata) {
  if (!metadata.authorIds) {
    return;
  }

  for (const author of metadata.authorIds) {
    if (!authorExists(author)) {
      collector.addError(
        `${fPath} has invalid authorId "${author}", no such .json file exists`
      );
    }
  }
}

function validateObj<T>(fPath: string, schema: any): T | undefined {
  const fContent = fs.readFileSync(fPath).toString();
  if (fContent.includes("TODO")) {
    collector.addError(
      `${fPath} contains a 'TODO', did you forget to fill in the template?`
    );
  }

  let obj;
  try {
    obj = JSON.parse(fContent);
  } catch (e) {
    collector.addError(`${fPath} is not valid JSON!`);
  }

  const res = v.validate(obj, schema);
  if (!res.valid) {
    let msg = `${fPath} is not valid!`;
    for (const e of res.errors) {
      msg += `    ${e.property}: ${e.message}`;
    }
    collector.addError(msg);
  }

  console.log(`  - ${fPath}`);
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
          validateAuthor(fPath, metadata);
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
          validateAuthor(fPath, metadata);
        }
      }
    }
  }

  if (collector.hasWarnings() || collector.hasErrors()) {
    collector.printSummary();
  }

  if (collector.hasErrors()) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
