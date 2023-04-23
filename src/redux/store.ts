import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
