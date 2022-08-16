// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  'firebase/auth'
import { getFirestore } from  'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "sneakie-mart.firebaseapp.com",
  projectId: "sneakie-mart",
  storageBucket: "sneakie-mart.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;