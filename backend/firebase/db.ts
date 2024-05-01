import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,

  authDomain: "azil-za-zivotinje.firebaseapp.com",

  projectId: "azil-za-zivotinje",

  storageBucket: "azil-za-zivotinje.appspot.com",

  messagingSenderId: process.env.messagingSenderId,

  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
