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
import * as admin from "firebase-admin";

import fetch from "node-fetch";

import { FirestoreQuery, QueryResult } from "../../shared/types/FirestoreQuery";

function isValidCollectionPath(path: string): boolean {
  const db = admin.firestore();
  try {
    db.collection(path);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidDocumentPath(path: string): boolean {
  const db = admin.firestore();
  try {
    db.doc(path);
    return true;
  } catch (e) {
    return false;
  }
}

export const queryProxy = functions
  .runWith({
    minInstances: 1,
  })
  .https.onRequest(async (req, res) => {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");

    // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
    res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

    // The "q'" param is a Base64 encoded FirestoreQuery
    const qEncoded = req.query.q as string;
    if (!qEncoded) {
      res.status(400).send('Parameter "q" is required');
      return;
    }

    // The "path" param is the collection to query
    let path = req.query.path as string;
    path = path
      .replace(/[&]/g, "&amp;")
      .replace(/[<]/g, "&lt;")
      .replace(/[>]/g, "&gt;");
    if (!path) {
      res.status(400).send('Parameter "path" is required');
      return;
    }

    const qDecoded = JSON.parse(
      Buffer.from(qEncoded, "base64").toString("utf-8")
    ) as FirestoreQuery;

    // Log out the query
    functions.logger.info(path);
    functions.logger.info(qDecoded);

    // This is only a warning because sometimes the XSS scanner does things like:
    // /authors/javascript:xssdetected(2335655322300400009712911n)...
    if (!isValidCollectionPath(path)) {
      const msg = `Invalid collection path: ${path}`;
      functions.logger.warn(msg);
      res.status(400).send(msg);
      return;
    }

    const db = admin.firestore();

    const scope = qDecoded.scope || "COLLECTION";
    let q: admin.firestore.Query =
      scope == "COLLECTION" ? db.collection(path) : db.collectionGroup(path);

    if (qDecoded.where) {
      for (const w of qDecoded.where) {
        q = q.where(w.fieldPath, w.operator as any, w.value);
      }
    }

    if (qDecoded.orderBy) {
      for (const ob of qDecoded.orderBy) {
        q = q.orderBy(ob.fieldPath, ob.direction as any);
      }
    }

    if (qDecoded.startAfter) {
      q = q.startAfter(...qDecoded.startAfter);
    }

    if (qDecoded.limit) {
      q = q.limit(qDecoded.limit);
    }

    const snap = await q.get();
    const docs = snap.docs.map((d) => {
      return {
        id: d.id,
        data: d.data(),
      };
    });
    const result: QueryResult<any> = {
      docs,
    };

    res.json(result);
  });

function diagnoseMissingDocument(path: string) {
  // Possible paths
  // Author:
  //  /authors/<author>
  // Blog:
  //  /products/<product>/blogs/<blog>
  // Repo:
  //  /products/<product>/repos/<repo>
  // Repo page:
  //  /products/<product>/repos/<repo>/pages/<page path base64>

  const segments = path.split("/").filter((x) => x && x.length > 0);
  const first = segments[0];

  if (first === "authors") {
    const id = segments[1];
    return `Could not find author ${id}`;
  } else if (first === "products") {
    const product = segments[1];
    const type = segments[2];
    if (type === "blogs") {
      const id = segments[3];
      return `Could not find ${product} blog ${id}`;
    } else if (type === "repos") {
      const id = segments[3];
      if (segments.length > 4) {
        const page = segments[5];
        const pageDecoded = Buffer.from(page, "base64").toString("utf-8");
        return `Could not find page "${pageDecoded}" on ${product} repo ${id}`;
      } else {
        return `Could not find ${product} repo ${id}`;
      }
    }
  }

  return `Unknown or invalid document path: "${path}"`;
}

export const docProxy = functions.https.onRequest(async (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");

  // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
  res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

  let path = req.query.path as string;
  path = path
    .replace(/[&]/g, "&amp;")
    .replace(/[<]/g, "&lt;")
    .replace(/[>]/g, "&gt;");
  if (!path) {
    res.status(400).send('Parameter "path" is required');
    return;
  }

  // This is only a warning because sometimes the XSS scanner does things like:
  // /authors/javascript:xssdetected(2335655322300400009712911n)...
  if (!isValidDocumentPath(path)) {
    const msg = `Invalid document path: ${path}`;
    functions.logger.warn(msg);
    res.status(400).send(msg);
    return;
  }

  const snap = await admin.firestore().doc(path).get();
  if (!snap.exists) {
    const msg = `Could not find document at path "${path}"`;
    functions.logger.error(msg);
    functions.logger.error(diagnoseMissingDocument(path));

    res.status(404).send(msg);
    return;
  }

  res.json(snap.data());
});

/**
 * Proxy https://api.github.com/emojis
 */
export const emojis = functions.https.onRequest(async (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");

  // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
  res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

  const r = await fetch("https://api.github.com/emojis");
  const obj = await r.json();

  res.json(obj);
});
