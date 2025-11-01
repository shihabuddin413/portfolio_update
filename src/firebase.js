// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA92M4QRbVkKDYtOcVoTK206wG2K4a3eF8",
  authDomain: "shihab-portfolio.firebaseapp.com",
  projectId: "shihab-portfolio",
  storageBucket: "shihab-portfolio.firebasestorage.app",
  messagingSenderId: "131482459317",
  appId: "1:131482459317:web:aa85c012a3c16b23f972fc",
  measurementId: "G-JRN2D73RFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);