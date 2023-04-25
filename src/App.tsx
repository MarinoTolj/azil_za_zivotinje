import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { increment } from "./redux/counterSlice";
import { db } from "./firebase/db";
import { collection, getDocs, query, where, } from "firebase/firestore";

const animalsRef = collection(db, "animals");
const q = query(animalsRef, where("name", "==", "tiger"));
function App() {
  const getData = async () => {
    const data = await getDocs(q);
    const animal = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log({ animal });
  };
  useEffect(() => {
    getData();
  }, []);
  return <div> Home</div>;
}

export default App;
