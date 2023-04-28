import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAnimal } from "../helpers/types";
import { firestore } from "../firebase/firestore";

export const fetchAllAnimals = createAsyncThunk(
  "animals/fetchAll",
  async () => {
    /* const animals = await firestore.GetCollectionByName<IAnimal[]>("animals");
    return animals; */
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
      state.animals = action.payload as any;
    });
  },
});

export default animalsSlice.reducer;
