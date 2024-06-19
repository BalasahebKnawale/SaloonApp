// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIy_8RaxlNvDha7vso6qHvcYEOPGn-Id8",
  authDomain: "mysalonapp-b5515.firebaseapp.com",
  databaseURL: "https://mysalonapp-b5515-default-rtdb.firebaseio.com",
  projectId: "mysalonapp-b5515",
  storageBucket: "mysalonapp-b5515.appspot.com",
  messagingSenderId: "747943538386",
  appId: "1:747943538386:web:4ef3b1c767cc603f30c70b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
