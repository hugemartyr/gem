// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYSaOR6HfSIdfa9nKUDGf2oDZlT-9jUF4",
  authDomain: "hugemartyr.firebaseapp.com",
  projectId: "hugemartyr",
  storageBucket: "hugemartyr.firebasestorage.app",
  messagingSenderId: "233268040910",
  appId: "1:233268040910:web:61c45535bfb2d0f62d2c9f",
  measurementId: "G-130MRL1YWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
