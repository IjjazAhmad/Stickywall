// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-cmJYdV6piD_U9ki3_XpjQ4aCby6kilk",
  authDomain: "istickywall.firebaseapp.com",
  projectId: "istickywall",
  storageBucket: "istickywall.appspot.com",
  messagingSenderId: "486157235743",
  appId: "1:486157235743:web:6d5ecd51cdf69d4dc6c72a",
  measurementId: "G-KXPVB8GW1W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}