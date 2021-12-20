import * as fs from "fs";
import * as path from "path";

import { RepoMetadata } from "../types/RepoMetadata";
import { getRepoContent, getRepoLicense } from "./addproject";

export async function main(args: string[]) {
  if (args.length < 2) {
    console.error(
      "Missing required arguments:\nnpm run auditrepo <config file path>"
    );
    return;
  }

  const configFilePath = args[2];
  const absPath = path.resolve(configFilePath);

  console.log(`File ${absPath}`);
  const fileContent = fs.readFileSync(absPath).toString();
  const repoConfig = JSON.parse(fileContent) as RepoMetadata;

  const { owner, repo, content } = repoConfig;
  console.log(`Repo: https://github.com/${owner}/${repo}`);
  console.log();

  // 1) Check the repo's license
  const license = await getRepoLicense(owner, repo);
  if (license) {
    const key = license.license.key;
    if (key === "apache-2.0" || key === "mit") {
      console.log(`✅ Valid license type: ${key}`);
    } else {
      console.log(`❌ Error: repository has invalid license type: ${key}`);
    }
  } else {
    console.log("❌ Error: repository does not have a license.");
  }

  // 2) Check that the content paths actually exist
  const contentPaths = [content];
  const pages = repoConfig.pages || [];
  for (const p of pages) {
    contentPaths.push(p.path);
  }

  for (const p of contentPaths) {
    const pageContent = await getRepoContent(owner, repo, p);
    if (pageContent) {
      console.log(`✅ Valid content ${content}`);
    } else {
      console.log(`❌ Error: invalid content path ${content}`);
    }
  }
}

if (require.main === module) {
  main(process.argv);
}
