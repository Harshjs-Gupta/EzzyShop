"use client";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7As2ZzOIA98XihRH1r0w_0DKfjMuI-ks",
  authDomain: "ezzyshop-58181.firebaseapp.com",
  projectId: "ezzyshop-58181",
  storageBucket: "ezzyshop-58181.appspot.com",
  messagingSenderId: "1010407998782",
  appId: "1:1010407998782:web:15850606e98ccc431ad86f",
  measurementId: "G-PBN0LF0H9W",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const database = getFirestore(app);
export const storage = getStorage(app);

// React component for initializing Analytics
export function FirebaseAnalyticsInitializer() {
  useEffect(() => {
    const initializeAnalytics = async () => {
      if (typeof window !== "undefined") {
        // Check if we're in the browser
        const supported = await isSupported();
        if (supported) {
          getAnalytics(app);
        }
      }
    };
    initializeAnalytics();
  }, []);

  return null; // This component doesn't render anything
}
