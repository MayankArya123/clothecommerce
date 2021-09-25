import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAC5mOnii6zwrqi30XiIU1IGp0JqG3v0G4",
    authDomain: "ecommerce-4f24b.firebaseapp.com",
    projectId: "ecommerce-4f24b",
    storageBucket: "ecommerce-4f24b.appspot.com",
    messagingSenderId: "280031370611",
    appId: "1:280031370611:web:6bc2e94253fbf1db46f906",
    measurementId: "G-RRPM8TZ912"
  };
  

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };