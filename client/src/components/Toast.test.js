import reducer, { closeToast, setToast } from "../slices/toastSlice";

describe("Toast Component", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      isOpen: false,
      message: "",
      severity: "success",
    });
  });

  test("should open toast message", () => {
    const prevState = {
      isOpen: false,
      message: "",
      severity: "success",
    };
    expect(
      reducer(prevState, setToast({ message: "Dummy", severity: "success" }))
    ).toEqual({ isOpen: true, message: "Dummy", severity: "success" });
  });

  test("should close toast message", () => {
    const prevState = {
      isOpen: true,
      message: "Dummy",
      severity: "success",
    };
    expect(reducer(prevState, closeToast())).toEqual({
      isOpen: false,
      message: "Dummy",
      severity: "success",
    });
  });
});
