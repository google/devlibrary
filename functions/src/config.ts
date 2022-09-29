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

import * as functions from "firebase-functions";

/**
 * Get a config value by the keys, so [github, token] points to github.token
 * When running locally we use env vars, so [github, token] points to GITHUB_TOKEN.
 */
export function get(...keys: string[]) {
  // Walk down functions config and look for a value
  let val = functions.config();
  for (const k of keys) {
    if (val) {
      val = val[k];
    }
  }

  // When running in the functions emulator we can use an env var override
  if (!val && process.env.FUNCTIONS_EMULATOR === "true") {
    const envKey = keys.map((k) => k.toUpperCase()).join("_");
    const envVal = process.env[envKey];
    if (envVal) {
      return envVal;
    }
  }

  if (!val) {
    const key = keys.join(".");
    console.warn(
      `No config value for ${key} in ${JSON.stringify(functions.config())}`
    );

    return "";
  }

  if (typeof val === "string") {
    return val;
  } else {
    return JSON.stringify(val);
  }
}
