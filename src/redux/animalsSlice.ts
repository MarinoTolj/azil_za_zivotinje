import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAnimal } from "../helpers/types";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/db";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchAllAnimals = createAsyncThunk(
  "animals/fetchAll",
  async () => {
    const data = await getDocs(query(collection(db, "animals")));
    const animals = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IAnimal[];
    return animals;
  }
);

const initialState: { animals: IAnimal[] } = {
  animals: [],
};

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllAnimals.fulfilled, (state, action) => {
      state.animals = action.payload;
    });
  },
});

export default animalsSlice.reducer;
