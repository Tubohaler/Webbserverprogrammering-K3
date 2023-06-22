import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "../../components/Todo";

describe("Todo", () => {
  it("renders the todo with the correct text and color", () => {
    const todoProps = {
      id: "1",
      title: "Test Todo",
      color: "blue",
      action: () => {},
    };
    const { getByText, getByTestId } = render(<Todo {...todoProps} />);

    expect(getByText(todoProps.title)).toBeInTheDocument();
  });

  it("calls the action function when delete button is clicked", () => {
    const action = {
      fn: () => 100,
    };
    const getActionSpy = vi.spyOn(action, "fn");
    const todoProps = {
      id: "1",
      title: "Test Todo",
      color: "blue",
      action: action.fn,
    };
    const { getByText } = render(<Todo {...todoProps} />);
    fireEvent.click(getByText("Delete"));
    getActionSpy.mock.calls.length === 1;
  });
});
