import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

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
  const deleteSong = async (songId) => {
    await axios.delete(`http://localhost:8000/songs/${songId}`);
    getAllSongs();
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
                onClick={() => deleteSong(song.song_id)}
              >
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Item>
      ))}
    </Box>
  );
};

export default SongList;
