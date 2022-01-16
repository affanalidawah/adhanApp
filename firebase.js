import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyD9YDEBLGlQX95x5AdQiJ2p19lGtV5lffE",
  authDomain: "managemasjidapp-ef030.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  projectId: "managemasjidapp-ef030",
  databaseURL: "https://managemasjidapp-ef030.firebaseio.com",
  storageBucket: "managemasjidapp-ef030.appspot.com",
  messagingSenderId: "54606952786",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Get a reference to the database service
const database = getDatabase(app);

export default firebase;
