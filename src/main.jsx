import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import TimeKeeper from "./pages/TimeKeeper";
import CalenderPage from "./pages/CalenderPage";
import Overview from "./pages/Overview";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import "./index.css";
import { TotalProvider } from "./contexts/Total";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "timer",
        element: <TimeKeeper />,
      },
      {
        path: "calender",
        element: <CalenderPage />,
      },
      {
        path: "overview",
        element: <Overview />,
        children: [
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TotalProvider>
      <RouterProvider router={router} />
    </TotalProvider>
  </React.StrictMode>
);
