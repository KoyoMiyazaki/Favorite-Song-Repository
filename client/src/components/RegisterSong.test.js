import { render, screen, cleanup } from "@testing-library/react";
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

describe("RegisterSong Component", () => {
  test("RegisterSong should render", async () => {
    const inputLabels = [
      "Song Name",
      "Album Name",
      "Artist Name",
      "Genre Name",
    ];

    render(<WrappedRegisterSong />);
    inputLabels.forEach((label) => {
      const labelElement = screen.getByLabelText(new RegExp(label, "i"));
      expect(labelElement).toBeInTheDocument();
    });

    const inputElements = await screen.findAllByRole("textbox");
    inputElements.forEach((elem, index) => {
      const nameProperty = inputLabels[index].replace(" ", "");
      expect(elem.name).toMatch(new RegExp(nameProperty, "i"));
    });

    const buttonElement = await screen.findByText(/^REGISTER$/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
