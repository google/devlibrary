import * as admin from "firebase-admin";

export function getProjectId(): string {
  if (isStringDefined(process.env.GCP_PROJECT)) {
    return process.env.GCP_PROJECT;
  }

  if (isStringDefined(process.env.GCLOUD_PROJECT)) {
    return process.env.GCLOUD_PROJECT;
  }

  if (isStringDefined(process.env.FIREBASE_CONFIG)) {
    try {
      const json = JSON.parse(process.env.FIREBASE_CONFIG);
      const projectId = json.project_id;
      if (isStringDefined(projectId)) {
        return projectId;
      }
    } catch (e) {
      // No-op
    }
  }

  if (admin.apps.length > 0) {
    const projectId = admin.apps[0]!.options.projectId;
    if (isStringDefined(projectId)) {
      return projectId;
    }
  }

  console.warn("Could not determine project id, default to production");
  return "ugc-site-prod";
}

function isStringDefined(str: string | undefined): str is string {
  if (str) {
    return str.length > 0;
  }

  return false;
}
