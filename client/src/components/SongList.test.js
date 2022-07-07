import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../stores";
import SongList from "./SongList";

const songs = [
  {
    song_id: 1,
    song_name: "song1",
    updated_at: "2022-07-04T03:03:04.401741+09:00",
    album: {
      album_id: 1,
      album_name: "album1",
      artist: {
        artist_id: 1,
        artist_name: "artist1",
      },
    },
    genre: {
      genre_id: 1,
      genre_name: "genre1",
    },
  },
];

const getAllSongs = () => {};

const WrappedSongList = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SongList songs={songs} getAllSongs={getAllSongs} />
      </BrowserRouter>
    </Provider>
  );
};

afterEach(() => cleanup());

describe("SongList Component", () => {
  test("SongList should render", async () => {
    render(<WrappedSongList />);
    const songAndAlbum = `${songs[0].song_name} / ${songs[0].album.album_name}`;
    const songAndAlbumElement = await screen.findByText(
      new RegExp(songAndAlbum, "i")
    );
    expect(songAndAlbumElement).toBeInTheDocument();

    const artist = songs[0].album.artist.artist_name;
    const artistElement = await screen.findByText(new RegExp(artist, "i"));
    expect(artistElement).toBeInTheDocument();

    const editLinkElement = await screen.findByRole("link");
    expect(editLinkElement).toBeInTheDocument();

    const deleteButtonElement = await screen.findByRole("button");
    expect(deleteButtonElement).toBeInTheDocument();
  });

  test("click delete button then should render dialog", async () => {
    render(<WrappedSongList />);
    const deleteButtonElement = await screen.findByRole("button");
    fireEvent.click(deleteButtonElement);
    const dialogTitleElement = await screen.findByRole("heading");
    expect(dialogTitleElement).toBeInTheDocument();
  });
});
