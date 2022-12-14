import { Outlet, Link } from "react-router-dom";

export async function loader() {
  const { data } = await axios.get("http://localhost:3000/timelogs");
  return { data };
}
