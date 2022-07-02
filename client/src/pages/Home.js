import React, { useState, useEffect } from "react";
import { Box, Pagination, Stack } from "@mui/material";
import axios from "axios";
import Title from "../components/Title";
import SongList from "../components/SongList";
import RegisterSong from "../components/RegisterSong";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const getAllSongs = async () => {
    const res = await axios.get(`http://localhost:8000/songs?page=${page}`);
    const data = await res.data;
    setNumPages(parseInt(data.numPages, 10));
    setSongs(data.data.getAllSongs);
  };

  useEffect(() => {
    getAllSongs();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack direction="column" spacing={3}>
      <Box>
        <Title title="Register Song" />
        <RegisterSong getAllSongs={() => getAllSongs()} />
      </Box>
      <Box>
        <Title title="Song List" />
        <SongList songs={songs} getAllSongs={() => getAllSongs()} />
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Pagination
            count={numPages}
            page={page}
            onChange={handlePageChange}
            size="large"
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default Home;
