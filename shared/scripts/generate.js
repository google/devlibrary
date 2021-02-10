const fs = require("fs");
const path = require("path");

const { compileFromFile } = require("json-schema-to-typescript");

async function main() {
  const dir = path.dirname(__filename);

  const schemaDir = path.resolve(dir, "../schema");
  const typesDir = path.resolve(dir, "../types");

  const files = fs.readdirSync(schemaDir);

  for (const f of files) {
    const { name, ext } = path.parse(f);
    if (ext !== ".json") {
      continue;
    }

    const fPath = path.join(schemaDir, f);
    const ts = await compileFromFile(fPath);

    console.log(`Writing class ${name}`);
    fs.writeFileSync(path.join(typesDir, `${name}.d.ts`), ts);
  }
}

main();
