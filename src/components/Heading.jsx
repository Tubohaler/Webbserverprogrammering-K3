import React from "react";
import styled from "styled-components";

const ModuleName = styled.h1`
  text-align: left;
  font-size: 2em;
  margin-left: 0.7em;
`;

function Heading(props) {
  return <ModuleName>{props.text}</ModuleName>;
}

export default Heading;
