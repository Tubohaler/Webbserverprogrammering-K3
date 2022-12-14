import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTotals } from "../contexts/Total";

const HeaderDiv = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  background-color: #ef6e26;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const ModuleName = styled.h1`
  text-align: left;
  font-size: 2em;
  margin-left: 0.7em;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: -1rem;
`;

const Buttons = styled.button`
  font-size: 2em;
  color: white;
  background-color: rgba(255, 53, 41, 0.56);
  margin: 0.2em;
  margin-left: 0.5em;
  padding: 0.25em 1em;
  box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;

const InputField = styled.input`
  margin: 1em;
  margin-left: 0.5em;
  width: 50%;
  padding: 12px 20px;
  border-radius: 6px;
  box-sizing: border-box;
`;

const TodoButton = styled.button`
  font-size: 0.9em;
  margin: 0.2em;
`;

const TodoListBar = styled.li`
  background-color: white;
  color: black;
  border-radius: 0px 7px 7px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em;
`;

const TodoUL = styled.ul`
  list-style: none;
  align-content: space-between;
  flex-wrap: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
`;

const TodoColor = styled.div`
  background-color: ${(props) => props.color};
  height: 3.7em;
`;

function Projects() {
  const {
    projects,
    getProjects,
    deleteProject,
    addProject,
    input,
    setInput,
    getTodos,
  } = useTotals();

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "../tasks";
    navigate(path);
  };

  useEffect(() => {
    getProjects();
    getTodos();
  }, []);

  return (
    <div>
      <HeaderDiv>
        <ModuleName>Översikt</ModuleName>
      </HeaderDiv>
      <ButtonDiv>
        <Buttons disabled>Projekt</Buttons>
        <Buttons onClick={routeChange}>Todos</Buttons>
      </ButtonDiv>
      <section>
        <InputField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <TodoButton onClick={addProject}>Add Project</TodoButton>
        <TodoUL>
          {projects.map((project) => (
            <TodoListBar key={project.id}>
              <TodoColor color={project.color}>....</TodoColor>
              {project.name}
              <TodoButton onClick={() => deleteProject(project.id)}>
                Delete
              </TodoButton>
            </TodoListBar>
          ))}
        </TodoUL>
      </section>
    </div>
  );
}

export default Projects;
