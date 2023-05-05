import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcsznaO1ME1Q6lJ21v7QCLgSbkj--rGAI",

  authDomain: "azil-za-zivotinje.firebaseapp.com",

  projectId: "azil-za-zivotinje",

  storageBucket: "azil-za-zivotinje.appspot.com",

  messagingSenderId: "1072721826162",

  appId: "1:1072721826162:web:c9261d52a27660337a8deb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
