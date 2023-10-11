// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZws5MGZtA2RXBTLWOWoiVaS2DoEWO988",
  authDomain: "mood-shifter.firebaseapp.com",
  projectId: "mood-shifter",
  storageBucket: "mood-shifter.appspot.com",
  messagingSenderId: "906549913357",
  appId: "1:906549913357:web:bd31ac0320c184ff583244",
  measurementId: "G-EM49KGZ2JB"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(firebase_app);
export const database = getFirestore(firebase_app);