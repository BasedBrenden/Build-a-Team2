// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj04TlOHQPhjj87M_o3Egih04g5hAROVc",
  authDomain: "buildateambt.firebaseapp.com",
  projectId: "buildateambt",
  storageBucket: "buildateambt.appspot.com",
  messagingSenderId: "231750263107",
  appId: "1:231750263107:web:e20e2f15ba084655c04ff6",
  measurementId: "G-SSTG0YXNM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);