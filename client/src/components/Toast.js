import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { setClose } from "../slices/toastSlice";

const Toast = () => {
  const isToastOpen = useSelector((state) => state.toast.isOpen);
  const toastMessage = useSelector((state) => state.toast.message);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={isToastOpen}
      autoHideDuration={4000}
      onClose={() => dispatch(setClose())}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
