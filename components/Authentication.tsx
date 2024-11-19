// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_JaWXl6vM-HVDgy35mhAwJJa6zHeBB8k",
  authDomain: "e-commerce-952cd.firebaseapp.com",
  projectId: "e-commerce-952cd",
  storageBucket: "e-commerce-952cd.firebasestorage.app",
  messagingSenderId: "498392661938",
  appId: "1:498392661938:web:47ad91e62201f1ce61eeab",
  measurementId: "G-KPEMXLCXZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);