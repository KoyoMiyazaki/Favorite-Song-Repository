import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
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
import {
  addToAlbumHistory,
  addToArtistHistory,
  addToGenreHistory,
} from "../slices/historySlice";

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
  const albumHistory = useSelector((state) => state.history.album);
  const artistHistory = useSelector((state) => state.history.artist);
  const genreHistory = useSelector((state) => state.history.genre);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleSong = async (songId) => {
      try {
        const res = await axios.get(`http://localhost:8000/songs/${songId}`);
        const data = await res.data;
        const { song_name, album, genre } = await data.data.getSingleSong;
        setInputValues({
          songName: song_name,
          albumName: album.album_name,
          artistName: album.artist.artist_name,
          genreName: genre.genre_name,
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
    getSingleSong(songId);
  }, []);

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
      await axios.put(`http://localhost:8000/songs/${songId}`, {
        song_name: inputValues.songName,
        album_name: inputValues.albumName,
        artist_name: inputValues.artistName,
        genre_name: inputValues.genreName,
      });
      dispatch(addToAlbumHistory(inputValues.albumName));
      dispatch(addToArtistHistory(inputValues.artistName));
      dispatch(addToGenreHistory(inputValues.genreName));
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
            Update
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default SingleSong;
