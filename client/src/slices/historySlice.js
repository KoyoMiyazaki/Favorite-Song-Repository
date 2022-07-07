import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  album: [],
  artist: [],
  genre: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setAlbumHistory: (state, action) => {
      const albumNames = action.payload.map((album) => album.album_name);
      state.album = Array.from(new Set(albumNames)).sort();
    },
    addToAlbumHistory: (state, action) => {
      const albumName = action.payload;
      state.album = Array.from(new Set([...state.album, albumName])).sort();
    },
    setArtistHistory: (state, action) => {
      const artistNames = action.payload.map((artist) => artist.artist_name);
      state.artist = Array.from(new Set(artistNames)).sort();
    },
    addToArtistHistory: (state, action) => {
      const artistName = action.payload;
      state.artist = Array.from(new Set([...state.artist, artistName])).sort();
    },
    setGenreHistory: (state, action) => {
      const genreNames = action.payload.map((genre) => genre.genre_name);
      state.genre = Array.from(new Set(genreNames)).sort();
    },
    addToGenreHistory: (state, action) => {
      const genreName = action.payload;
      state.genre = Array.from(new Set([...state.genre, genreName])).sort();
    },
  },
});

export const {
  setAlbumHistory,
  setArtistHistory,
  setGenreHistory,
  addToAlbumHistory,
  addToArtistHistory,
  addToGenreHistory,
} = historySlice.actions;

export default historySlice.reducer;
