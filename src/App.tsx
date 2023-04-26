import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { increment } from "./redux/counterSlice";
import { db } from "./firebase/db";
import { collection, getDocs, query, where } from "firebase/firestore";

function App() {
  return <div> Home</div>;
}

export default App;
