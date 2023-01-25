import * as fs from "fs";
import { getConfigDir, writeOrUpdateJSON } from "./util";
import * as path from "path";
const csvParse = require("csv-parse/lib/sync");

interface PartialData {
  expertise?: string;
};

function main(args: string[]) {
  if (args.length < 2) {
    console.error(
      "Missing required arguments:\nnpm run backfillmetadata <csvPath>"
    );
    return;
  }
  const urlToExpertise: Map<string, PartialData> = read(args[2]);
  
  updateProjects(urlToExpertise);
}

export function read(csvPath: string): Map<string, PartialData> {
  const csvContent = fs.readFileSync(csvPath);

  const records = csvParse(csvContent, {
    columns: true,
  });
  const urlToMetadata = new Map<string, PartialData>();
  for(const record of records) {
    if(record.url && record.expertise) {
      urlToMetadata.set(record.url, {
        expertise: record.expertise.toUpperCase()
      });
    }
  }
  return urlToMetadata;
}

function updateProjects(urlToMetadata: Map<string, PartialData>) {
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
      

      const repoMetadata = JSON.parse(
        fs.readFileSync(path.join(reposDir, repoFile), "utf-8")
      );
      const repoLink = `https://github.com/${repoMetadata.owner}/${repoMetadata.repo}`;
      if(urlToMetadata.has(repoLink)) {
        const partialData = urlToMetadata.get(repoLink);
        writeOrUpdateJSON(path.join(reposDir, repoFile), partialData);
      }
      else {
        const partialData ={ expertise: 'INTERMEDIATE' };
        writeOrUpdateJSON(path.join(reposDir, repoFile), partialData);
      }
    }

    const blogFiles = fs
      .readdirSync(blogsDir)
      .filter((f) => f.endsWith(".json"));
    for (const blogFile of blogFiles) {
      console.log(`[${p}] ${blogFile}`);

      const blogMetadata = JSON.parse(
        fs.readFileSync(path.join(blogsDir, blogFile), "utf-8")
      );
      const blogLink = blogMetadata.link;
      if(urlToMetadata.has(blogLink)) {
        const partialData = urlToMetadata.get(blogLink);
        writeOrUpdateJSON(path.join(blogsDir, blogFile), partialData);
      }
      else {
        const partialData = { expertise: 'INTERMEDIATE' }
        writeOrUpdateJSON(path.join(blogsDir, blogFile), partialData);
      }
    }
  }
}

if (require.main === module) {
  main(process.argv);
}
