import firebase from "firebase/app";
import "firebase/firestore";

let _firestore: firebase.firestore.Firestore | null = null;

export function app() {
  // TODO: Get separate dev and prod apps!
  if (firebase.apps.length === 0) {
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

  return firebase.app();
}

export function firestore() {
  if (_firestore === null) {
    _firestore = app().firestore();
    if (process.env.NODE_ENV !== "production") {
      _firestore.useEmulator("localhost", 8001);
    }
  }

  return _firestore;
}
