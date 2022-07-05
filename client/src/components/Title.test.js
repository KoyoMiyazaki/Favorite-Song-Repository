import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title Component", () => {
  test("Title should render", async () => {
    const title = "test";
    render(<Title title={title} />);
    const titleElement = await screen.findByText(new RegExp(title, "i"));
    expect(titleElement).toBeInTheDocument();
  });
});
