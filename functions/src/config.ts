import * as functions from "firebase-functions";

/**
 * Get a config value by the keys, so [github, token] points to github.token
 * When running locally we use env vars, so [github, token] points to GITHUB_TOKEN.
 */
export function get(...keys: string[]) {
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    const envKey = keys.map((k) => k.toUpperCase()).join("_");
    const envVal = process.env[envKey];
    if (!envVal) {
      console.warn(`No value for $${envKey}!`);
    }

    return envVal || "";
  }

  let val = functions.config();
  for (const k of keys) {
    val = val[k];
  }

  if (!val) {
    const key = keys.join(".");
    console.warn(
      `No config value for ${key} in ${JSON.stringify(functions.config())}`
    );
  }

  return val || "";
}
