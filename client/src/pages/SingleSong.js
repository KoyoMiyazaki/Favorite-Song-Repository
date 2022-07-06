import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { setToast } from "../slices/toastSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingSong = async (songId) => {
      try {
        const res = await axios.get(`http://localhost:8000/songs/${songId}`);
        const data = await res.data;
        const { song_name, album_id, genre_id } = await data.data.getSingleSong;
        setInputValues({
          songName: song_name,
          albumName: album_id.album_name,
          artistName: album_id.artist_id.artist_name,
          genreName: genre_id.genre_name,
        });
      } catch (e) {
        if (e instanceof AxiosError) {
          dispatch(
            setToast({
              message: "Network Error... Please try again later!",
              severity: "error",
            })
          );
        }
      }
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
    try {
      await axios.put(`http://localhost:8000/songs/${songId}`, {
        song_name: inputValues.songName,
        album_name: inputValues.albumName,
        artist_name: inputValues.artistName,
        genre_name: inputValues.genreName,
      });
      dispatch(
        setToast({
          message: "Updated!",
          severity: "success",
        })
      );
      navigate("/");
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
  };

  return (
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
    </Stack>
  );
};

export default SingleSong;
