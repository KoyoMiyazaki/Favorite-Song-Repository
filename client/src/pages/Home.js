import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Pagination,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import Title from "../components/Title";
import SongList from "../components/SongList";
import RegisterSong from "../components/RegisterSong";
import { setToast } from "../slices/toastSlice";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const dispatch = useDispatch();

  const getAllSongs = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/songs?page=${page}`);
      const data = await res.data;
      setNumPages(parseInt(data.numPages, 10));
      setSongs(data.data.getAllSongs);
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
      <Grid item paddingX="1rem">
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
