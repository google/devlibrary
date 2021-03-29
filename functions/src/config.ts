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

    return ""
  }

  if (typeof val === "string") {
    return val;
  } else {
    return JSON.stringify(val);
  }
}
