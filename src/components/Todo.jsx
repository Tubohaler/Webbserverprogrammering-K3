// @ts-check
import React from "react";
import styled from "styled-components";

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

function Todo({ id, title, color, action }) {
  return (
    <TodoListBar key={id}>
      <TodoColor color={color}>....</TodoColor>
      {title}
      <TodoButton onClick={action}>Delete</TodoButton>
    </TodoListBar>
  );
}

export default Todo;
