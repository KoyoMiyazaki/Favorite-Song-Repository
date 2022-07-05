import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../stores";
import RegisterSong from "./RegisterSong";

const getAllSongs = () => {};

const WrappedRegisterSong = () => {
  return (
    <Provider store={store}>
      <RegisterSong getAllSongs={getAllSongs} />
    </Provider>
  );
};

afterEach(() => cleanup());

const inputLabels = ["Song Name", "Album Name", "Artist Name", "Genre Name"];

describe("RegisterSong Component", () => {
  test("RegisterSong should render", async () => {
    render(<WrappedRegisterSong />);
    await waitFor(() =>
      expect(screen.getByLabelText(/Song Name/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByLabelText(/Album Name/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByLabelText(/Artist Name/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByLabelText(/Genre Name/i)).toBeInTheDocument()
    );
    const inputElements = await screen.findAllByRole("textbox");
    inputElements.forEach((elem, index) => {
      const nameProperty = inputLabels[index].replace(" ", "");
      expect(elem.name).toMatch(new RegExp(nameProperty, "i"));
    });
    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
  });
});
