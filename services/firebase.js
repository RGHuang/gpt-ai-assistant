// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: 'chatgpt-backend.firebaseapp.com',
  projectId: 'chatgpt-backend',
  storageBucket: 'chatgpt-backend.appspot.com',
  messagingSenderId: '892268037055',
  appId: '1:892268037055:web:fced38180e60302898970a',
  measurementId: 'G-EB14DWVK52',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
