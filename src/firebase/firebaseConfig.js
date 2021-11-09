import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBW7TCDxrMbDDDLC2TPqz4NHkXBPe1ERyM",
  authDomain: "react-redux-6d2c0.firebaseapp.com",
  projectId: "react-redux-6d2c0",
  storageBucket: "react-redux-6d2c0.appspot.com",
  messagingSenderId: "158549644676",
  appId: "1:158549644676:web:365d2b3f19ba01259539d1",
  measurementId: "G-K1VS4F79RQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
 const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider,
    doc, //Referencia a documento en Firestore
    setDoc, // Setea Datos en la base de Firestore,
    collection,
    getDocs, // Importar getDocs de firebase/firestore
}