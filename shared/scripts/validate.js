const fs = require("fs");
const path = require("path");
const Validator = require("jsonschema").Validator;

const BlogMetadataSchema = require("../schema/BlogMetadata.json");
const RepoMetadataSchema = require("../schema/RepoMetadata.json");

const v = new Validator();
v.addSchema(BlogMetadataSchema, "BlogMetadata");
v.addSchema(RepoMetadataSchema, "RepoMetadata");

function validateObj(fPath, schema) {
  const fContent = fs.readFileSync(fPath).toString();
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

  const productDirs = fs.readdirSync(configDir);
  for (const product of productDirs) {
    console.log(`\nValidating blogs for ${product}`);
    const productBlogsDir = path.join(configDir, product, "blogs");
    const productBlogFiles = fs.readdirSync(productBlogsDir);
    for (const f of productBlogFiles) {
      const fPath = path.join(productBlogsDir, f);
      validateObj(fPath, BlogMetadataSchema);
    }

    console.log(`\nValidating repos for ${product}`);
    const productReposDir = path.join(configDir, product, "repos");
    const productRepoFiles = fs.readdirSync(productReposDir);
    for (const f of productRepoFiles) {
      const fPath = path.join(productReposDir, f);
      validateObj(fPath, RepoMetadataSchema);
    }
  }
}

main();
