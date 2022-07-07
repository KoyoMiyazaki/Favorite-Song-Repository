import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../slices/toastSlice";
import historyReducer from "../slices/historySlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    history: historyReducer,
  },
});
