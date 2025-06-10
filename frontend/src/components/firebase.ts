// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA1K41pFgRUa4tAPogNuWj8p21yHbxJ8c",
  authDomain: "aiprojectauth-78e79.firebaseapp.com",
  projectId: "aiprojectauth-78e79",
  storageBucket: "aiprojectauth-78e79.firebasestorage.app",
  messagingSenderId: "950064449471",
  appId: "1:950064449471:web:0cd07ab98efeb09130c30a",
  measurementId: "G-MLZM8PKMZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);