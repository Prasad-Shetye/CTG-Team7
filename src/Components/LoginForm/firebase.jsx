// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmXT6gHxA2y8zpl_aFZZNOfmF2I8T-i64",
  authDomain: "codetogive-4d2eb.firebaseapp.com",
  projectId: "codetogive-4d2eb",
  storageBucket: "codetogive-4d2eb.appspot.com",
  messagingSenderId: "433690683698",
  appId: "1:433690683698:web:980e66e0c16a8e33eacf2b",
  measurementId: "G-37QN9W96ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export{app, auth};