import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3an0iSRSRo2IKO-ziYvRUwEqolE9IuOI",
  authDomain: "fitforge--app.firebaseapp.com",
  projectId: "fitforge--app",
  storageBucket: "fitforge--app.firebasestorage.app",
  messagingSenderId: "654587478887",
  appId: "1:654587478887:web:bc3f7d7ea34939d5e2a5c2"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);