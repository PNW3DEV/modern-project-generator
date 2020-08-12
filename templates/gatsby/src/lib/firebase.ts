import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"

import * as firebase from "firebase/app"

if (typeof window !== "undefined" && firebase.apps.length === 0 && process.env.REACT_APP_API_KEY) {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY || "",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN || "",
    databaseURL: process.env.REACT_APP_DATABASE_URL || "",
    projectId: process.env.REACT_APP_PROJECT_ID || "",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_APP_ID || "",
    measurementId: process.env.REACT_APP_MEASUREMENT_ID || "",
  }
  firebase.initializeApp(config)
  if (!!window.IDBIndex) {
    firebase.analytics()
  }
}

export default firebase
