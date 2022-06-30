import { ArrowBackIos } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";

const StyledTextField = styled(TextField)({
  width: "100%",
});

const SingleSong = () => {
  const [inputValues, setInputValues] = useState({
    songName: "",
    albumName: "",
    artistName: "",
    genreName: "",
  });
  const { songId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingSong = async (songId) => {
      const res = await axios.get(`http://localhost:8000/songs/${songId}`);
      const data = await res.data;
      const { song_name, album_id, genre_id } = await data.data.getSingleSong;
      setInputValues({
        songName: song_name,
        albumName: album_id.album_name,
        artistName: album_id.artist_id.artist_name,
        genreName: genre_id.genre_name,
      });
    };
    getSingSong(songId);
  }, []);

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
    await axios.put(`http://localhost:8000/songs/${songId}`, {
      song_name: inputValues.songName,
      album_name: inputValues.albumName,
      artist_name: inputValues.artistName,
      genre_name: inputValues.genreName,
    });
    navigate("/");
  };

  return (
    <>
      <Tooltip title="To Home Page">
        <IconButton
          aria-label="back"
          sx={{ marginBottom: "1rem" }}
          component={Link}
          to="/"
        >
          <ArrowBackIos fontSize="large" />
        </IconButton>
      </Tooltip>
      <Title title="Update Song" />
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <StyledTextField
            label="Song Name"
            variant="outlined"
            name="songName"
            value={inputValues.songName}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={handleInput}
          />
          <StyledTextField
            label="Album Name"
            variant="outlined"
            name="albumName"
            value={inputValues.albumName}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={handleInput}
          />
          <StyledTextField
            label="Artist Name"
            variant="outlined"
            name="artistName"
            value={inputValues.artistName}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={handleInput}
          />
          <StyledTextField
            label="Genre Name"
            variant="outlined"
            name="genreName"
            value={inputValues.genreName}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={handleInput}
          />
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default SingleSong;
