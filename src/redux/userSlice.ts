import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAdmin: boolean;
}

const initialState: UserState = {
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleIsAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    setIsAdmin: (state, payload) => {
      state.isAdmin = payload.payload;
    },
  },
});

export const { toggleIsAdmin, setIsAdmin } = userSlice.actions;

export default userSlice.reducer;
