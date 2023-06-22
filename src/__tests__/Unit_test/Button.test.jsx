import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button", () => {
  it("renders the button with the correct text", () => {
    const buttonText = "Test Button";
    const { getByText } = render(
      <Button text={buttonText} action={() => {}} />
    );
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it("calls the action function when clicked", () => {
    const buttonText = "Test Button";
    const actionMock = () => "1";
    const action = {
      fn: () => 100,
    };
    const getActionSpy = vi.spyOn(action, "fn");
    const { getByText } = render(
      <Button text={buttonText} action={action.fn} />
    );
    fireEvent.click(getByText(buttonText));
    getActionSpy.mock.calls.length === 1;
  });
});
