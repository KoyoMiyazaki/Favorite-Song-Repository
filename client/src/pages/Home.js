import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import Title from "../components/Title";
import SongList from "../components/SongList";
import RegisterSong from "../components/RegisterSong";

const Home = () => {
  const [songs, setSongs] = useState([]);

  const getAllSongs = async () => {
    const res = await axios.get("http://localhost:8000/songs/");
    const data = await res.data;
    setSongs(data.data.getAllSongs);
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <Stack direction="column" spacing={3}>
      <Box>
        <Title title="Register Song" />
        <RegisterSong getAllSongs={() => getAllSongs()} />
      </Box>
      <Box>
        <Title title="Song List" />
        <SongList songs={songs} getAllSongs={() => getAllSongs()} />
      </Box>
    </Stack>
  );
};

export default Home;
