import React, { useState } from "react";
import { Autocomplete, Button, Stack, styled, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../slices/toastSlice";
import {
  addToAlbumHistory,
  addToArtistHistory,
  addToGenreHistory,
} from "../slices/historySlice";

const StyledTextField = styled(TextField)({
  width: "100%",
});

const RegisterSong = ({ getAllSongs }) => {
  const [inputValues, setInputValues] = useState({
    songName: "",
    albumName: "",
    artistName: "",
    genreName: "",
  });
  const albumHistory = useSelector((state) => state.history.album);
  const artistHistory = useSelector((state) => state.history.artist);
  const genreHistory = useSelector((state) => state.history.genre);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChange = (e, newValue) => {
    const keyName = e.target.parentNode.getAttribute("name");
    setInputValues((prev) => {
      return {
        ...prev,
        [keyName]: newValue,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/songs/", {
        song_name: inputValues.songName,
        album_name: inputValues.albumName,
        artist_name: inputValues.artistName,
        genre_name: inputValues.genreName,
      });
      const data = await result.data;
      if (data.status !== "success") {
        dispatch(
          setToast({
            message: data.message,
            severity: "error",
          })
        );
      } else {
        dispatch(addToAlbumHistory(inputValues.albumName));
        dispatch(addToArtistHistory(inputValues.artistName));
        dispatch(addToGenreHistory(inputValues.genreName));
        dispatch(
          setToast({
            message: "Registered!",
            severity: "success",
          })
        );
      }
      getAllSongs();
    } catch (e) {
      if (e instanceof AxiosError) {
        e.response.data
          ? dispatch(
              setToast({
                message: e.response.data.message,
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
    setInputValues({
      songName: "",
      albumName: "",
      artistName: "",
      genreName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <StyledTextField
          label="Song Name"
          variant="outlined"
          name="songName"
          value={inputValues.songName}
          onInput={handleInput}
          required
        />
        <Autocomplete
          options={albumHistory}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Album Name"
              name="albumName"
              onInput={handleInput}
            />
          )}
          value={inputValues.albumName}
          onChange={handleChange}
          ListboxProps={{ name: "albumName" }}
        />
        <Autocomplete
          options={artistHistory}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Artist Name"
              name="artistName"
              onInput={handleInput}
            />
          )}
          value={inputValues.artistName}
          onChange={handleChange}
          ListboxProps={{ name: "artistName" }}
        />
        <Autocomplete
          options={genreHistory}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Genre Name"
              name="genreName"
              onInput={handleInput}
            />
          )}
          value={inputValues.genreName}
          onChange={handleChange}
          ListboxProps={{ name: "genreName" }}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterSong;
