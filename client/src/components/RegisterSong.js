import React, { useState } from "react";
import { Button, Stack, styled, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOpen, setMessage } from "../slices/toastSlice";

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
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/songs/", {
      song_name: inputValues.songName,
      album_name: inputValues.albumName,
      artist_name: inputValues.artistName,
      genre_name: inputValues.genreName,
    });
    setInputValues({
      songName: "",
      albumName: "",
      artistName: "",
      genreName: "",
    });
    dispatch(setMessage("Registered!"));
    dispatch(setOpen());
    getAllSongs();
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
        />
        <StyledTextField
          label="Album Name"
          variant="outlined"
          name="albumName"
          value={inputValues.albumName}
          onInput={handleInput}
        />
        <StyledTextField
          label="Artist Name"
          variant="outlined"
          name="artistName"
          value={inputValues.artistName}
          onInput={handleInput}
        />
        <StyledTextField
          label="Genre Name"
          variant="outlined"
          name="genreName"
          value={inputValues.genreName}
          onInput={handleInput}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterSong;
