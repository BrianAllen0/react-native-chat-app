import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfTgteXaImoE-Skq3Mp48C9zRmvxzh9P0",
  authDomain: "shopping-list-demo-4d8ce.firebaseapp.com",
  projectId: "shopping-list-demo-4d8ce",
  storageBucket: "shopping-list-demo-4d8ce.appspot.com",
  messagingSenderId: "12273369232",
  appId: "1:12273369232:web:965af1733344299d599815",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
