import * as fs from "fs";
import * as path from "path";

import { RepoMetadata } from "../types/RepoMetadata";
import { getRepoContent, getRepoLicense } from "./addproject";

export async function diagnoseRepo(metadata: RepoMetadata) {
  const { owner, repo, content } = metadata;
  console.log(`Repo: https://github.com/${owner}/${repo}`);
  console.log();

  let hasError = false;

  // 1) Check the repo's license
  const license = await getRepoLicense(owner, repo);
  if (license) {
    const key = license.license.key;
    if (key === "apache-2.0" || key === "mit") {
      console.log(`✅ Valid license type: ${key}`);
    } else {
      console.log(
        `❌ Error: ${owner}/${repo} has invalid license type: ${key}`
      );
      hasError = true;
    }
  } else {
    console.log(`❌ Error: ${owner}/${repo} does not have a license.`);
    hasError = true;
  }

  // 2) Check that the content paths actually exist
  const contentPaths = [content];
  const pages = metadata.pages || [];
  for (const p of pages) {
    contentPaths.push(p.path);
  }

  for (const p of contentPaths) {
    const pageContent = await getRepoContent(owner, repo, p);
    if (pageContent) {
      console.log(`✅ Valid content ${p}`);
    } else {
      console.log(`❌ Error: ${owner}/${repo} has no content path ${p}`);
      hasError = true;
    }
  }

  if (hasError) {
    process.exit(1);
  }
}

export async function main(args: string[]) {
  if (args.length < 3) {
    console.error(
      "Missing required arguments:\nnpm run diagnoserepo <config file path> <... more paths>"
    );
    return;
  }

  for (let i = 2; i < args.length; i++) {
    const configFilePath = args[i];
    const absPath = path.resolve(configFilePath);

    console.log(`File: ${configFilePath}`);
    const fileContent = fs.readFileSync(absPath).toString();
    const metadata = JSON.parse(fileContent) as RepoMetadata;
    await diagnoseRepo(metadata);
    console.log();
  }
}

if (require.main === module) {
  main(process.argv);
}
