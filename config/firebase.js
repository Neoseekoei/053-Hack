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
  apiKey: "AIzaSyBX0LQZJCd95cttcSwUZoibjjMB0IxK9tQ",
  authDomain: "muni-3984f.firebaseapp.com",
  projectId: "muni-3984f",
  storageBucket: "muni-3984f.appspot.com",
  messagingSenderId: "607644072329",
  appId: "1:607644072329:web:d132231629ce0a15f34958",
  measurementId: "G-EV9551401F"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth , db};