import { Routes, Route } from "react-router-dom";
import { styled, Box } from "@mui/material";
import Home from "./pages/Home";
import "./App.css";
import SingleSong from "./pages/SingleSong";

const StyledBox = styled(Box)({
  maxWidth: "720px",
  margin: "0 auto",
  padding: "2rem",
});

function App() {
  return (
    <StyledBox>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="songs/:songId" element={<SingleSong />} />
      </Routes>
    </StyledBox>
  );
}

export default App;
