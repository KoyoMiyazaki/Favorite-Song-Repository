import { Routes, Route } from "react-router-dom";
import { styled, Box } from "@mui/material";
import Home from "./pages/Home";
import SingleSong from "./pages/SingleSong";
import Toast from "./components/Toast";
import "./App.css";

const StyledBox = styled(Box)({
  width: "100%",
  padding: "2rem",
});

function App() {
  return (
    <StyledBox>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="songs/:songId" element={<SingleSong />} />
      </Routes>

      <Toast />
    </StyledBox>
  );
}

export default App;
