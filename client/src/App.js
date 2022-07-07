import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import {
  setAlbumHistory,
  setArtistHistory,
  setGenreHistory,
} from "./slices/historySlice";
import Home from "./pages/Home";
import SingleSong from "./pages/SingleSong";
import SearchResult from "./pages/SearchResult";
import Toast from "./components/Toast";
import "./App.css";

const StyledBox = styled(Box)({
  width: "100%",
  padding: "2rem",
});

function App() {
  const dispatch = useDispatch();

  const getLatestAlbums = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/albums/latest?limit=10`
      );
      const data = await res.data;
      dispatch(setAlbumHistory(data.data.getLatestAlbums));
    } catch (e) {
      if (e instanceof AxiosError) {
        // do nothing
      }
    }
  };

  const getLatestArtists = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/artists/latest?limit=10`
      );
      const data = await res.data;
      dispatch(setArtistHistory(data.data.getLatestArtists));
    } catch (e) {
      if (e instanceof AxiosError) {
        // do nothing
      }
    }
  };

  const getLatestGenres = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/genres/latest?limit=10`
      );
      const data = await res.data;
      dispatch(setGenreHistory(data.data.getLatestGenres));
    } catch (e) {
      if (e instanceof AxiosError) {
        // do nothing
      }
    }
  };

  useEffect(() => {
    getLatestAlbums();
    getLatestArtists();
    getLatestGenres();
  }, []);

  return (
    <StyledBox>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search/" element={<SearchResult />} />
        <Route path="songs/:songId" element={<SingleSong />} />
      </Routes>

      <Toast />
    </StyledBox>
  );
}

export default App;
