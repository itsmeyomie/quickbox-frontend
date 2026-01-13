import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase configuration
// Get this from Firebase Console > Project Settings > Your apps > Web app
const firebaseConfig = {
  apiKey: "AIzaSyDdSnphyclRu-Kxt0MCs1cIV1xspZhbVTY",
  authDomain: "quickbox-c5fab.firebaseapp.com",
  projectId: "quickbox-c5fab",
  storageBucket: "quickbox-c5fab.firebasestorage.app",
  messagingSenderId: "738840359688",
  appId: "1:738840359688:web:6717859aa1d22d725df2bd",
  measurementId: "G-K79RSPJ6EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
