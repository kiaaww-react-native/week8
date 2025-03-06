// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtHJ2loTi7H3LfbALFn8yAynHf1gPI8yE",
  authDomain: "shopping-list-36748.firebaseapp.com",
  projectId: "shopping-list-36748",
  storageBucket: "shopping-list-36748.firebasestorage.app",
  messagingSenderId: "180207251195",
  appId: "1:180207251195:web:4c16b8c970f8fdb858ca5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };