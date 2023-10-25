import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg9MhQtfeWRqqoSetApQhbct710NUvsFY",
  authDomain: "kanban-board-97fb3.firebaseapp.com",
  projectId: "kanban-board-97fb3",
  storageBucket: "kanban-board-97fb3.appspot.com",
  messagingSenderId: "633907760403",
  appId: "1:633907760403:web:8face92fba71a0e99c5ee6",
  measurementId: "G-Z1JCYBC6T1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
