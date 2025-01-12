// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD78reMBpBjqxjz-UNPP8QxjA9f9DCwr4",
  authDomain: "preparify-7567d.firebaseapp.com",
  projectId: "preparify-7567d",
  storageBucket: "preparify-7567d.firebasestorage.app",
  messagingSenderId: "1022640286178",
  appId: "1:1022640286178:web:350a939309e06e59ecf1bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Firebase Storage

// Export the Firebase services for use in your app
export { auth, db, storage };
