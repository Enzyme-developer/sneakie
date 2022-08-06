// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  'firebase/auth'
import { getFirestore } from  'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9gUzHUwap8co60eOqoyiGNtmiYzIA7GU",
  authDomain: "sneakie-mart.firebaseapp.com",
  projectId: "sneakie-mart",
  storageBucket: "sneakie-mart.appspot.com",
  messagingSenderId: "611246447995",
  appId: "1:611246447995:web:5bded07c1e0e5b280331de",
  measurementId: "G-XTQ4SLM1FL"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;