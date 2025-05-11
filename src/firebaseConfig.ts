// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_cD6wQPGoyf8lw8ce4V1ad67ENVbk3Vw",
  authDomain: "mi-openlab-44b47.firebaseapp.com",
  projectId: "mi-openlab-44b47",
  storageBucket: "mi-openlab-44b47.firebasestorage.app",
  messagingSenderId: "453014135241",
  appId: "1:453014135241:web:c3bbbe64c9713a70920818",
  measurementId: "G-S9RVMXLLH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
// export const signInWithGoogle = () => {