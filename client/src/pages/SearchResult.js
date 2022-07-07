import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import Title from "../components/Title";
import SongList from "../components/SongList";
import { setToast } from "../slices/toastSlice";

const SearchResult = () => {
  const [songs, setSongs] = useState([]);
  const [numData, setNumData] = useState(0);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchWord = search.split("=")[1];

  const getAllSongs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/songs/search/${searchWord}`
      );
      const data = await res.data;
      setNumData(parseInt(data.numData, 10));
      setSongs(data.data.searchSongs);
    } catch (e) {
      if (e instanceof AxiosError) {
        searchWord === ""
          ? dispatch(
              setToast({
                message: "Search word must be required!",
                severity: "error",
              })
            )
          : dispatch(
              setToast({
                message: "Network Error... Please try again later!",
                severity: "error",
              })
            );
      }
    }
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <>
      {searchWord === "" && <Navigate to="/" />}
      <Stack
        direction="column"
        spacing={2}
        sx={{ maxWidth: "960px", width: "100%", margin: "0 auto" }}
      >
        <Tooltip title="To Home Page">
          <IconButton
            aria-label="back"
            sx={{ width: "50px" }}
            component={Link}
            to="/"
          >
            <ArrowBackIos fontSize="large" />
          </IconButton>
        </Tooltip>
        <Title title="Search Result" />
        {numData === 0 ? (
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            marginTop={10}
          >
            Corresponding songs do not exist.
          </Typography>
        ) : (
          <SongList songs={songs} getAllSongs={() => getAllSongs()} />
        )}
      </Stack>
    </>
  );
};

export default SearchResult;
