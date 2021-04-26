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

import firebase from "firebase/app";

// TODO: Do we need this at all anymore if we're not using Firestore on the frontend?
export function app() {
  if (firebase.apps.length === 0) {
    if (process.env.VUE_APP_FIREBASE_PROJECT === "ugc-site-prod") {
      const firebaseConfig = {
        apiKey: "AIzaSyDuFklTpneQMB0Qn1gfsVmkqz7t26OP1FI",
        authDomain: "ugc-site-prod.firebaseapp.com",
        projectId: "ugc-site-prod",
        storageBucket: "ugc-site-prod.appspot.com",
        messagingSenderId: "612799003045",
        appId: "1:612799003045:web:af1e4bf6519d1cd28b904c",
      };
      firebase.initializeApp(firebaseConfig);
    } else {
      const firebaseConfig = {
        apiKey: "AIzaSyC7XE241yh_cfitOHN59fEODPNGMPUzSl4",
        authDomain: "ugc-site-dev.firebaseapp.com",
        projectId: "ugc-site-dev",
        storageBucket: "ugc-site-dev.appspot.com",
        messagingSenderId: "867368912668",
        appId: "1:867368912668:web:24eb5d1c6ca72154eb1cd9",
      };
      firebase.initializeApp(firebaseConfig);
    }
  }

  return firebase.app();
}

export function hostingRoot() {
  return `https://${process.env.VUE_APP_FIREBASE_PROJECT}.web.app`;
}
