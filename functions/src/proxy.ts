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

import { FirestoreQuery, QueryResult } from "../../shared/types/FirestoreQuery";

export const queryProxy = functions.https.onRequest(async (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");

  // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
  res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

  // The "q'" param is a Base64 encoded FirestoreQuery
  const qEncoded = req.query.q as string;
  if (!qEncoded) {
    res.status(400).send('HTTP 400: "q" is required');
    return;
  }

  // The "path" param is the collection to query
  const path = req.query.path as string;
  if (!path) {
    res.status(400).send('HTTP 400: "path" is required');
    return;
  }

  const qDecoded = JSON.parse(
    Buffer.from(qEncoded, "base64").toString("ascii")
  ) as FirestoreQuery;

  // Log out the query
  functions.logger.info(path);
  functions.logger.info(qDecoded);

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

export const docProxy = functions.https.onRequest(async (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");

  // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
  res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

  const path = req.query.path as string;
  if (!path) {
    res.status(400).send('HTTP 400: "path" is required');
    return;
  }

  const snap = await admin.firestore().doc(path).get();
  if (!snap.exists) {
    res.status(404).send(`HTTP 404: could not find document at path "${path}"`);
    return;
  }

  res.json(snap.data());
});
