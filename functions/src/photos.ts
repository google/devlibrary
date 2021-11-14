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

import { AuthorData } from "../../shared/types";

export const authorPhoto = functions
  .runWith({
    minInstances: 1,
  })
  .https.onRequest(async (req, res) => {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");

    // Cache at browser for 10 minutes (600s) and on CDN for 12 hours (43200s)
    res.set("Cache-Control", "public, max-age=600, s-maxage=43200");

    // The "id" param is an author id
    const authorId = req.query.id as string;
    if (!authorId) {
      res.status(400).send('Parameter "id" is required');
      return;
    }
    const db = admin.firestore();

    const ref = db.collection("authors").doc(authorId);

    try {
      const snap = await ref.get();
      if (!snap || !snap.exists) {
        res.status(404).send(`Author ${authorId} does not exist`);
        return;
      }

      const author = snap.data() as AuthorData;
      const photoURL = author.metadata.photoURL;
      res.redirect(photoURL);
    } catch (e) {
      res.status(404).send(`Author ${authorId} does not exist`);
    }
  });
