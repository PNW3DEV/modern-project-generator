/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// require('typeface-roboto')
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"

import * as firebase from "firebase/app"

export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.className = document.body.className.replace(/\bno-js\b/, '')
  })
}

export const onRouteUpdate = () => {
  if (!!window.IDBIndex) {
    firebase.analytics()
  }
};

export { default as wrapRootElement } from "./src/lib/wrapRootElement"
