import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  //   textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.palette.text.secondary,
  marginBottom: "0.5rem",
  padding: "1rem",
}));

const SongList = ({ songs }) => {
  return (
    <Box>
      {songs.map((song) => (
        <Item key={song.song_id} elevation={4}>
          <Typography variant="h6" component="p">
            {song.song_name} / {song.album_id.album_name}
          </Typography>
          <Stack direction="row">
            <IconButton aria-label="edit">
              <Edit color="info" />
            </IconButton>
            <IconButton aria-label="delete">
              <Delete color="error" />
            </IconButton>
          </Stack>
        </Item>
      ))}
    </Box>
  );
};

export default SongList;
