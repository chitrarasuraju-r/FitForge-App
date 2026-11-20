import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYlMizyHSs4gJKHZpau4Qlc70wI0WNs4Y",
  authDomain: "FitForge---app.firebaseapp.com",
  projectId: "FitForge---app",
  storageBucket: "FitForge---app.firebasestorage.app",
  messagingSenderId: "203125339161",
  appId: "1:203125339161:web:21fae3e8666e86dce0a688",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);