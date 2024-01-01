// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBuYPOEMUV4rwJAONvIxQf6P_-ZEAlcDQ",
  authDomain: "haan-beer.firebaseapp.com",
  projectId: "haan-beer",
  storageBucket: "haan-beer.appspot.com",
  messagingSenderId: "548686598721",
  appId: "1:548686598721:web:b64efea88ebf0c0e30acc0",
  measurementId: "G-ZX18NL35YX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
getAnalytics(app);

