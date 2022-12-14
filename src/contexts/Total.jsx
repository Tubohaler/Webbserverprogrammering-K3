import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [projects, setProjects] = useState([]);
  const [todos, setTodos] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [active, setActive] = useState(false);
  const [timelog, setTimelog] = useState([]);

  //PROJECTS
  const getProjects = async () => {
    const { data } = await axios.get("http://localhost:3000/projects");
    setProjects(data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:3000/projects/${id}`);
    getProjects();
  };

  const addProject = async () => {
    const { data } = await axios.post("http://localhost:3000/projects", {
      name: input,
      color: "#4E0E9F",
    });
    getProjects();
  };

  // TODOS
  const getTodos = async () => {
    const { data } = await axios.get("http://localhost:3000/tasks");
    setTodos(data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    getTodos();
  };

  const postTodo = async () => {
    const { data } = await axios.post("http://localhost:3000/tasks", {
      title: input,
    });
    getTodos();
  };

  // TIMER
  const getAllTimelogs = async () => {
    const { data } = await axios.get("http://localhost:3000/timelogs");
    setTimelog(data);
  };

  const postTimelog = async (date, taskId, time) => {
    const { data } = await axios.post("http://localhost:3000/timelogs", {
      start: date,
      taskId,
      time,
    });
    getAllTimelogs();
  };

  const deleteTimelog = async (id) => {
    await axios.delete(`http://localhost:3000/timelogs/${id}`);
    getAllTimelogs();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <TotalContext.Provider
      value={{
        projects,
        setProjects,
        getProjects,
        deleteProject,
        addProject,
        input,
        setInput,
        input2,
        setInput2,
        todos,
        setTodos,
        getTodos,
        deleteTodo,
        postTodo,
        startDate,
        setStartDate,
        active,
        setActive,
        getAllTimelogs,
        postTimelog,
        timelog,
        deleteTimelog,
      }}
    >
      {children}
    </TotalContext.Provider>
  );
};

export const useTotals = () => {
  const context = useContext(TotalContext);
  if (!context) {
    throw new Error("error, useTotals is outside total provider.");
  }
  return context;
};
