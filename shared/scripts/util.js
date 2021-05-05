const fs = require("fs");
const path = require("path");

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

function writeOrUpdateJSON(filePath, content) {
  let newContent = content;
  if (fs.existsSync(filePath)) {
    console.log("Updating file:", filePath);
    const existingContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    newContent = {
      ...newContent,
      ...existingContent,
    }
  } else {
    console.log("Writing new file:", filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify(newContent, undefined, 2));
}

module.exports = {
  writeOrUpdateJSON,
  getConfigDir
}
