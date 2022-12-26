import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdok4l39JwRZ657yI3EW72Q7r5XkDqxQc",
  authDomain: "food-recipe-6c478.firebaseapp.com",
  projectId: "food-recipe-6c478",
  storageBucket: "food-recipe-6c478.appspot.com",
  messagingSenderId: "177706744122",
  appId: "1:177706744122:web:99ae8238e04cdb8e4ab803",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
