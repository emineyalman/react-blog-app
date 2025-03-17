// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';  // Firestore import'unu ekledik

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUrvmj7E2XuP6aFdS68RsPOESt7ScwhDo",
  authDomain: "react-blog-a7f93.firebaseapp.com",
  projectId: "react-blog-a7f93",
  storageBucket: "react-blog-a7f93.firebasestorage.app",
  messagingSenderId: "585871905535",
  appId: "1:585871905535:web:e63f94fbee005ad3f6f2ca",
  measurementId: "G-BPN7M3BC5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Export db
export { db };