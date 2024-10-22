import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBZ-ABsQ6h7puZuMB7KnS4eeLMbSXP0-Do",
    authDomain: "cosmetic-f9d25.firebaseapp.com",
    projectId: "cosmetic-f9d25",
    storageBucket: "cosmetic-f9d25.appspot.com",
    messagingSenderId: "575686657837",
    appId: "1:575686657837:web:8dfa2e61c4788ffbe835a4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };