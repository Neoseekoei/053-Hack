// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD7eRnVG6CoP9XbV8NqT9SukK7gahtyIPA",
  authDomain: "muni-solve.firebaseapp.com",
  projectId: "muni-solve",
  storageBucket: "muni-solve.appspot.com",
  messagingSenderId: "1091425324650",
  appId: "1:1091425324650:web:c2cd381951bb059de44413",
  measurementId: "G-5H68XSEJ6W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth , db};