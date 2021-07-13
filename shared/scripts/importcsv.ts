import * as fs from "fs";
import { addMediumBlog, addOtherBlog, addRepo } from "./addproject";

const csvParse = require("csv-parse/lib/sync");

async function addRepoFromCsv(record: any) {
  const product = record.product.toLowerCase();

  const overrides = {
    name: record.name,
    shortDescription: record.shortDescription,
    longDescription: record.longDescription,
    content: record.content,
    tags: record.tags.split(",").map((t: string) => t.trim()),
  };

  const projectUrl = `https://github.com/${record.owner}/${record.repo}`;

  try {
    const id = await addRepo(product, projectUrl, undefined, overrides);
    return `https://devlibrary.withgoogle.com/products/${product}/repos/${id}`;
  } catch (e) {
    console.warn(e);
    return "error";
  }
}

async function addBlogFromCsv(record: any) {
  const product = record.product.toLowerCase();

  const overrides = {
    title: record.title,
    author: record.author,
    tags: record.tags.split(",").map((t: string) => t.trim()),
  };

  try {
    let id = undefined;
    if (record.source === "medium") {
      id = await addMediumBlog(product, record.link, undefined, overrides);
    }

    if (record.source === "other") {
      id = await addOtherBlog(product, record.link, undefined, overrides);
    }
    return `https://devlibrary.withgoogle.com/products/${product}/blogs/${id}`;
  } catch (e) {
    console.warn(e);
    return "error";
  }
}

export async function main(args: string[]) {
  if (args.length < 3) {
    console.error(
      "Missing required arguments:\nnpm run importcsv <type> <csvPath>"
    );
    return;
  }

  const type = args[2];
  if (!(type === "blog" || type === "repo")) {
    console.error(`Invalid type "${type}", must be one of "blog" or "repo"`);
    return;
  }

  const csvPath = args[3];
  const csvContent = fs.readFileSync(csvPath);

  const records = csvParse(csvContent, {
    columns: true,
  });

  const urls = [];
  for (const record of records) {
    if (record.skip && record.skip === "yes") {
      urls.push("skip");
    } else if (type === "blog") {
      const url = await addBlogFromCsv(record);
      urls.push(url);
    } else if (type === "repo") {
      const url = await addRepoFromCsv(record);
      urls.push(url);
    }
  }

  console.log();
  console.log();
  console.log("================== URLS ==================");
  console.log();
  console.log();

  for (const u of urls) {
    console.log(u);
  }
}

if (require.main === module) {
  main(process.argv);
}
