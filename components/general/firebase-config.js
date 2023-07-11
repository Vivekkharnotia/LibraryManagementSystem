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
  apiKey: "AIzaSyB7t0QnGS6ZUVS9tkXiwlWxIdfbFgk89vs",
  authDomain: "librarymanagement-f16a4.firebaseapp.com",
  projectId: "librarymanagement-f16a4",
  storageBucket: "librarymanagement-f16a4.appspot.com",
  messagingSenderId: "253557499358",
  appId: "1:253557499358:web:4df498ecf42b5ce965e94f",
  measurementId: "G-LTGRRDSEEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fbStorage = getStorage(app);