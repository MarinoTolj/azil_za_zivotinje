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
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsAdmin } = userSlice.actions;

export default userSlice.reducer;
