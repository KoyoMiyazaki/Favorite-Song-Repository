import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.isOpen = true;
    },
    setClose: (state) => {
      state.isOpen = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setOpen, setClose, setMessage } = toastSlice.actions;

export default toastSlice.reducer;
