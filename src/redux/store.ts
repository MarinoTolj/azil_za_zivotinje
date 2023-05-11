import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
