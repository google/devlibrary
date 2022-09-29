import * as fs from "fs";
import * as path from "path";

export function getConfigDir(): string {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

export function writeOrUpdateJSON(filePath: string, content: any) {
  let newContent = content;
  if (fs.existsSync(filePath)) {
    console.log("Updating file:", filePath);
    const existingContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    newContent = {
      ...newContent,
      ...existingContent,
    };
  } else {
    console.log("Writing new file:", filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify(newContent, undefined, 2) + "\n");
}
