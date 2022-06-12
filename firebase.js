import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXq-j-QPJsrkg_W49ArXNdFrc0LGqzwAs",
  authDomain: "masjid-development.firebaseapp.com",
  projectId: "masjid-development",
  storageBucket: "masjid-development.appspot.com",
  messagingSenderId: "272040850019",
  appId: "1:272040850019:web:9224ee1df9c61ac8167e56",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const masjidID = "bUyFLCnK10ghb9wFyVW6XUfjXGh1";

export { db, auth, storage };
