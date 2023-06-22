import { render, fireEvent } from "@testing-library/react";
import Modal from "../../components/layout/Modal";
import { TotalProvider } from "../../contexts/Total";

describe("Modal Component", () => {
  it("should render and handle closing", () => {
    const mockHideModal = vitest.fn();
    const { getByText } = render(
      <TotalProvider>
        <Modal title="Test Title" active={true} hideModal={mockHideModal} />
      </TotalProvider>
    );

    const title = getByText("Test Title");
    expect(title).toBeInTheDocument();

    const closeButton = getByText("X");
    fireEvent.click(closeButton);
    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });
});
