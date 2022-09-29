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

import { compileFromFile } from "json-schema-to-typescript";

export async function main() {
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

    // TODO: This should add a license header, if possible
    console.log(`Writing class ${name}`);
    fs.writeFileSync(path.join(typesDir, `${name}.d.ts`), ts);
  }
}

if (require.main === module) {
  main();
}
