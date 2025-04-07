import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Paste your config here
  apiKey: "AIzaSyCqsrXyHTIiOFE5La_Zn9ThwAZ6QAV69E4",
  authDomain: "blog-project-f61b1.firebaseapp.com",
  projectId: "blog-project-f61b1",
  storageBucket: "blog-project-f61b1.firebasestorage.app",
  messagingSenderId: "193092786949",
  appId: "1:193092786949:web:2c8c7489d6e258ad30756c",
  measurementId: "G-95MZXJ9Z28"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);