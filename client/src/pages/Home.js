import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Pagination,
  Stack,
  styled,
} from "@mui/material";
import axios from "axios";
import Title from "../components/Title";
import SongList from "../components/SongList";
import RegisterSong from "../components/RegisterSong";
import { ExpandMore } from "@mui/icons-material";

const GridItem = styled(Grid)({
  "& .css-1vbpcsy-MuiGrid-root>.MuiGrid-item": {
    padding: "0rem",
  },
});

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
    <Grid
      container
      rowSpacing={3}
      direction={{ xs: "column" }}
      sx={{ maxWidth: "960px", width: "100%", margin: "0 auto" }}
      justifyContent="center"
    >
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title title="Register Song" />
          </AccordionSummary>
          <AccordionDetails>
            <RegisterSong getAllSongs={() => getAllSongs()} />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default Home;
