import { setupServer } from "msw/node";
import { rest } from "msw";
import data from "./data";
import { TotalProvider } from "../../contexts/Total";
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import App from "../../App";
import TimeKeeper from "../../pages/TimeKeeper";
import CalenderPage from "../../pages/CalenderPage";
import Overview from "../../pages/Overview";
import Projects from "../../pages/Projects";
import Tasks from "../../pages/Tasks";
import {
  prettyDOM,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  getByText,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
export const handlers = [
  rest.get("http://localhost:3000/test", (req, res, ctx) => {
    return res(ctx.json(data));
  }),
  rest.get("http://localhost:3000/timelogs", (req, res, ctx) => {
    return res(ctx.json(data.timelogs));
  }),
  rest.get("http://localhost:3000/timelogs/:id", (req, res, ctx) => {
    const { timerId } = req.params;
    return res(ctx.json(data.timelogs));
  }),
  rest.delete("http://localhost:3000/timelogs/:timerId", (req, res, ctx) => {
    const { timerId } = req.params;
    data.timelogs = data.timelogs.filter((t) => t.id !== timerId);
    return res(ctx.json(data.timelogs));
  }),
  rest.get("http://localhost:3000/projects", (req, res, ctx) => {
    return res(ctx.json(data.projects));
  }),
  rest.get("http://localhost:3000/projects/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(data.projects.find((p) => p.id === id)));
  }),
  rest.post("http://localhost:3000/projects", (req, res, ctx) => {
    const newProject = req.body;
    const newId = Math.max(...data.projects.map((p) => p.id), 0) + 1;
    newProject.id = newId;
    data.projects.push(newProject);
    return res(ctx.status(201), ctx.json(newProject));
  }),
  rest.delete("http://localhost:3000/projects/:id", (req, res, ctx) => {
    const { id } = req.params;
    data.projects = data.projects.filter((p) => {
      return p.id != id;
    });
    return res(ctx.json(data.projects));
  }),
  rest.get("http://localhost:3000/tasks", (req, res, ctx) => {
    return res(ctx.json(data.tasks));
  }),
  rest.get("http://localhost:3000/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(data.tasks.find((t) => t.id === id)));
  }),
  rest.delete("http://localhost:3000/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;
    data.tasks = data.tasks.filter((t) => t.id != id);
    return res(ctx.json(data.tasks));
  }),
  rest.get("http://localhost:3000/test", (req, res, ctx) => {
    return res(ctx.json(data));
  }),
  rest.get("http://localhost:3000/timelogs", (req, res, ctx) => {
    return res(ctx.json(data.timelogs));
  }),
  rest.get("http://localhost:3000/timelogs/:id", (req, res, ctx) => {
    const { timerId } = req.params;
    return res(ctx.json(data.timelogs));
  }),
  rest.delete("http://localhost:3000/timelogs/:timerId", (req, res, ctx) => {
    const { timerId } = req.params;
    data.timelogs = data.timelogs.filter((t) => t.id !== timerId);
    return res(ctx.json(data.timelogs));
  }),
  rest.get("http://localhost:3000/projects", (req, res, ctx) => {
    return res(ctx.json(data.projects));
  }),
  rest.get("http://localhost:3000/projects/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(data.projects.find((p) => p.id === id)));
  }),
  rest.post("http://localhost:3000/projects", (req, res, ctx) => {
    const newProject = req.body;
    const newId = Math.max(...data.projects.map((p) => p.id), 0) + 1;
    newProject.id = newId;
    data.projects.push(newProject);
    return res(ctx.status(201), ctx.json(newProject));
  }),
  rest.delete("http://localhost:3000/projects/:id", (req, res, ctx) => {
    const { id } = req.params;
    data.projects = data.projects.filter((p) => {
      return p.id != id;
    });
    return res(ctx.json(data.projects));
  }),
  rest.get("http://localhost:3000/tasks", (req, res, ctx) => {
    return res(ctx.json(data.tasks));
  }),
  rest.get("http://localhost:3000/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(data.tasks.find((t) => t.id === id)));
  }),
  rest.delete("http://localhost:3000/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;
    data.tasks = data.tasks.filter((t) => t.id != id);
    return res(ctx.json(data.tasks));
  }),
];
const server = setupServer(...handlers);
const createDataRouter = (initial) => {
  return createMemoryRouter(
    [
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
    ],
    { initialEntries: ["/", initial] }
  );
};
const createRouter = (path) => {
  const router = createDataRouter(path);
  return (
    <TotalProvider>
      <RouterProvider router={router} />
    </TotalProvider>
  );
};
beforeAll(() => server.listen());
afterAll(() => server.close());
describe("Projects", () => {
  test("removing a project should remove it from projects overview", async () => {
    const projectNameToDelete = "snus";
    const projectNameRegex = new RegExp(projectNameToDelete, "i");
    const user = userEvent.setup();
    render(createRouter("/overview/projects"));
    await waitFor(() => screen.getAllByText(projectNameRegex));
    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    await user.click(deleteButtons[deleteButtons.length - 1]);
    expect(screen.queryByText(projectNameRegex)).not.toBeInTheDocument();
  });
  test("Adding a project should add it from projects overview", async () => {
    const projectNameToAdd = "fisching";
    const projectNameRegex = new RegExp(projectNameToAdd, "i");
    const user = userEvent.setup();
    render(createRouter("/overview/projects"));
    await user.type(screen.getByRole("textbox"), projectNameToAdd);
    user.click(screen.getByRole("button", { name: /Add Project/i }));
    await waitFor(() => screen.getByText(projectNameRegex));
    expect(screen.getByText(projectNameRegex)).toBeInTheDocument();
  });
});

describe("Todos", () => {
  test("Removing a todo should remove it from todo overview", async () => {
    const todoNameToDelete = "snus";
    const todoNameRegex = new RegExp(todoNameToDelete, "i");
    const user = userEvent.setup();
    render(createRouter("/overview/tasks"));
    await waitFor(() => screen.getAllByText(todoNameRegex));
    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    await user.click(deleteButtons[deleteButtons.length - 1]);
    expect(screen.queryByText(todoNameRegex)).not.toBeInTheDocument();
  });
});
