import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { setup } from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../stores";
import SingleSong from "./SingleSong";

const WrappedSingleSong = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SingleSong />
      </BrowserRouter>
    </Provider>
  );
};

afterEach(() => cleanup());

describe("SingleSong Component", () => {
  test("SingleSong should render", async () => {
    const inputLabels = [
      "Song Name",
      "Album Name",
      "Artist Name",
      "Genre Name",
    ];
    render(<WrappedSingleSong />);
    inputLabels.forEach((label) => {
      const labelElement = screen.getByLabelText(new RegExp(label, "i"));
      expect(labelElement).toBeInTheDocument();
    });

    const inputElements = await screen.findAllByRole("textbox");
    inputElements.forEach((elem, index) => {
      const nameProperty = inputLabels[index].replace(" ", "");
      expect(elem.name).toMatch(new RegExp(nameProperty, "i"));
    });

    const buttonElement = await screen.findByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toMatch(/UPDATE/i);

    const backLinkElement = await screen.findByRole("link");
    expect(backLinkElement).toBeInTheDocument();
  });
});
