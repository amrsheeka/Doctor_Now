// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCKVNDdIJ0jSlwzDtpFQgliItcUNGfu-xQ",
//   authDomain: "cs303-2022-8bb96.firebaseapp.com",
//   databaseURL: "https://cs303-2022-8bb96-default-rtdb.firebaseio.com",
//   projectId: "cs303-2022-8bb96",
//   storageBucket: "cs303-2022-8bb96.appspot.com",
//   messagingSenderId: "642131260294",
//   appId: "1:642131260294:web:2dc0b40dda4f84aa4ef207",
//   measurementId: "G-JR1BDTSMXJ",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB_2QGI93_eYhULYByH5cOuqh0eTFq8CXk",
  authDomain: "gp-project-81b56.firebaseapp.com",
  databaseURL: "https://gp-project-81b56-default-rtdb.firebaseio.com",
  projectId: "gp-project-81b56",
  storageBucket: "gp-project-81b56.appspot.com",
  messagingSenderId: "105938190422",
  appId: "1:105938190422:web:0766256c1abe715348fbf7",
  measurementId: "G-PH5NK4L2NW",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
