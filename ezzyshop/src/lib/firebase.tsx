import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7As2ZzOIA98XihRH1r0w_0DKfjMuI-ks",
  authDomain: "ezzyshop-58181.firebaseapp.com",
  projectId: "ezzyshop-58181",
  storageBucket: "ezzyshop-58181.appspot.com",
  messagingSenderId: "1010407998782",
  appId: "1:1010407998782:web:15850606e98ccc431ad86f",
  measurementId: "G-PBN0LF0H9W",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const database = getFirestore(app);
export const storage = getStorage();
