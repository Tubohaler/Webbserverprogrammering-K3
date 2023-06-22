// @ts-check
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";

import { useTotals } from "../contexts/Total";
import Modal from "../components/layout/Modal";

import styled from "styled-components";

const HeaderDiv = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  background-color: #ef6e26;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const ModuleName = styled.h1`
  text-align: left;
  font-size: 2em;
  margin-left: 0.7em;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: -15rem;
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

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1em;
  margin-bottom: -16em;
  overflow: scroll;
  width: 19em;
  height: 19em;
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

const TodoColor = styled.div`
  background-color: ${(props) => props.color};
  height: 3.7em;
`;

const Button = styled.button`
  margin-left: 2em;
  background: rgba(255, 53, 41, 0.56);
  color: white;
  font-size: 1em;
  margin: 10px;
  padding: 5px 10px;
  border: 2px solid #7b2cbf;
  border-radius: 3px;
  cursor: pointer;
`;

function Tasks() {
  const {
    todos,
    getTodos,
    deleteTodo,
    postTodo,
    active,
    setActive,
    addProject,
    getProjects,
  } = useTotals();

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "../projects";
    navigate(path);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <HeaderDiv>
        <ModuleName>Todos</ModuleName>
      </HeaderDiv>
      <ButtonDiv>
        <Buttons onClick={routeChange}>Projekt</Buttons>
        <Buttons disabled>Todos</Buttons>
      </ButtonDiv>
      <section>
        <Button onClick={() => setActive(true)}>Create new Todo</Button>
        <div>
          <Modal
            active={active}
            hideModal={() => setActive(false)}
            footer={
              <Button
                onClick={() => {
                  postTodo();
                  addProject();
                }}
              >
                Create
              </Button>
            }
          />
        </div>
        <TodoList>
          {todos.map((todo) => (
            <Todo
              title={todo.title}
              id={todo.id}
              color={getProjects.color}
              action={() => deleteTodo(todo.id)}
            />
          ))}
        </TodoList>
      </section>
    </div>
  );
}

export default Tasks;
