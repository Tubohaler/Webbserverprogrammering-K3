import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Projects from "../pages/Projects";
import { TotalProvider } from "../contexts/Total";
import { BrowserRouter } from "react-router-dom";

test("show title of header", () => {
  render(
    <BrowserRouter>
      <TotalProvider>
        <Projects />
      </TotalProvider>
    </BrowserRouter>
  );
  const title = screen.getByText("Översikt");
  expect(title).toBeInTheDocument();
});
