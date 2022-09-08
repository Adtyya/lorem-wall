// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChDJ5WF0ryIF0vhOsjCfTjYiO3Pk7Gvck",
  authDomain: "walp-share.firebaseapp.com",
  projectId: "walp-share",
  storageBucket: "walp-share.appspot.com",
  messagingSenderId: "627036921723",
  appId: "1:627036921723:web:9d89c400167c5239d3e7de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
