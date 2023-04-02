// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKVNDdIJ0jSlwzDtpFQgliItcUNGfu-xQ",
  authDomain: "cs303-2022-8bb96.firebaseapp.com",
  databaseURL: "https://cs303-2022-8bb96-default-rtdb.firebaseio.com",
  projectId: "cs303-2022-8bb96",
  storageBucket: "cs303-2022-8bb96.appspot.com",
  messagingSenderId: "642131260294",
  appId: "1:642131260294:web:2dc0b40dda4f84aa4ef207",
  measurementId: "G-JR1BDTSMXJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
