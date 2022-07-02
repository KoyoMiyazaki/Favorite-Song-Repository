import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  severity: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.isOpen = true;
    },
    closeToast: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
