import React from "react";
import styled from "styled-components";

const TodoButton = styled.button`
  font-size: 0.9em;
  margin: 0.2em;
`;

function Button(props) {
  return (
    <TodoButton onClick={() => deleteProject(project.id)}>
      {props.text}
    </TodoButton>
  );
}

export default Button;
