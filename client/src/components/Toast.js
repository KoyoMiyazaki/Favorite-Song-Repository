import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { closeToast } from "../slices/toastSlice";

const Toast = () => {
  const isToastOpen = useSelector((state) => state.toast.isOpen);
  const toastMessage = useSelector((state) => state.toast.message);
  const toastSeverity = useSelector((state) => state.toast.severity);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={isToastOpen}
      autoHideDuration={4000}
      onClose={() => dispatch(closeToast())}
    >
      <Alert severity={toastSeverity} sx={{ width: "100%" }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
