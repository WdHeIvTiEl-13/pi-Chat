import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4o9W3nlqNdFRvlxA8IFJmqovtFqiJg6E",
  authDomain: "test-1-57ace.firebaseapp.com",
  projectId: "test-1-57ace",
  storageBucket: "test-1-57ace.appspot.com",
  messagingSenderId: "971254457220",
  appId: "1:971254457220:web:cd08f52a510f16d1f873d1"
};
//Initialize app
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
