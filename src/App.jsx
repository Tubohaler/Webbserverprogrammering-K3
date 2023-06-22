import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      navigate("timer");
    }
  }, []);

  return (
    <div className="App">
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;
