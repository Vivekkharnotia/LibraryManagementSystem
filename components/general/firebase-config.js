// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWJoWrSc8bfm_2Fb9dr3vRz0yeVm9HPaE",
  authDomain: "my-first-project-d4cba.firebaseapp.com",
  projectId: "my-first-project-d4cba",
  storageBucket: "my-first-project-d4cba.appspot.com",
  messagingSenderId: "571744640020",
  appId: "1:571744640020:web:de84ed6b487e48f7119b01",
  measurementId: "G-9S0DTBEZHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fbStorage = getStorage(app);