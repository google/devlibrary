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
