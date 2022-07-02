import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { setOpen, setMessage } from "../slices/toastSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.palette.text.secondary,
  marginBottom: "0.5rem",
  padding: "1rem",
}));

const SongList = ({ songs, getAllSongs }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [willDeleteSongId, setWillDeleteSongId] = useState(null);
  const dispatch = useDispatch();

  const deleteSong = async (songId) => {
    await axios.delete(`http://localhost:8000/songs/${songId}`);
    setWillDeleteSongId(null);
    setIsDialogOpen(false);
    dispatch(setMessage("Deleted!"));
    dispatch(setOpen());
    getAllSongs();
  };

  const handleDialogOpen = (songId) => {
    setWillDeleteSongId(songId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box>
      {songs.map((song) => (
        <Item key={song.song_id} elevation={4}>
          <Typography variant="h6" component="p">
            {song.song_name} / {song.album_id.album_name}
          </Typography>
          <Stack direction="row">
            <Tooltip title="Edit This Song">
              <IconButton
                aria-label="edit"
                component={Link}
                to={`/songs/${song.song_id}`}
              >
                <Edit color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete This Song">
              <IconButton
                aria-label="delete"
                onClick={() => handleDialogOpen(song.song_id)}
              >
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Item>
      ))}

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure to delete "${
            willDeleteSongId &&
            songs.find((song) => song.song_id === willDeleteSongId).song_name
          }" ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Back</Button>
          <Button onClick={() => deleteSong(willDeleteSongId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SongList;
