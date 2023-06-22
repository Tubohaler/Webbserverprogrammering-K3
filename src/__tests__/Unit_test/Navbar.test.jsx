import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

describe("Navbar Component", () => {
  it("renders the navbar with all links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const timerLink = screen.getByRole("link", { name: /timer/i });
    const calenderLink = screen.getByRole("link", { name: /calender/i });
    const overviewLink = screen.getByRole("link", { name: /overview/i });

    expect(timerLink).toBeInTheDocument();
    expect(calenderLink).toBeInTheDocument();
    expect(overviewLink).toBeInTheDocument();
  });
});
