"use client";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB7As2ZzOIA98XihRH1r0w_0DKfjMuI-ks",
  authDomain: "ezzyshop-58181.firebaseapp.com",
  projectId: "ezzyshop-58181",
  storageBucket: "ezzyshop-58181.appspot.com",
  messagingSenderId: "1010407998782",
  appId: "1:1010407998782:web:15850606e98ccc431ad86f",
  measurementId: "G-PBN0LF0H9W",
};

// Initialize Firebase app and services (conditionally for client-side)
let app, auth, provider, database, storage;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  database = getFirestore(app);
  storage = getStorage(app);
}

const App = () => {
  useEffect(() => {
    const initializeFirebaseAnalytics = async () => {
      const app = initializeApp(firebaseConfig);
      if (await isSupported()) {
        const analytics = getAnalytics(app);
        console.log("Analytics initialized", analytics);
      } else {
        console.log("Firebase Analytics is not supported in this environment");
      }
    };

    initializeFirebaseAnalytics();
  }, []);

  // return <div>Your app content</div>;/
};

export { auth, provider, database, storage };
export default App;
