import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1B_YoNMi9_516n9Qd0GPOGruIYrAxa3w",
  authDomain: "vue-firebase-d9c32.firebaseapp.com",
  projectId: "vue-firebase-d9c32",
  storageBucket: "vue-firebase-d9c32.appspot.com",
  messagingSenderId: "1052035905804",
  appId: "1:1052035905804:web:a0c0dd3b7e27911a877129",
};

const app = initializeApp(firebaseConfig),
  db = getFirestore(app);

export { db };
