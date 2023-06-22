import React from "react";
import clock from "../../assets/clock.svg";
import calender from "../../assets/calender.svg";
import overview from "../../assets/overview.svg";
import { Link } from "react-router-dom";

import styled from "styled-components";

const ProjectNav = styled.nav`
  display: flex;
  margin-top: 2em;
  justify-content: space-around;
  width: 100vw;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: #ef6e26;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 40px;
`;

function Navbar() {
  return (
    <ProjectNav>
      <Link to="timer" aria-label="timer">
        <StyledImage src={clock} />
      </Link>
      <Link to="calender" aria-label="calender">
        <StyledImage src={calender} />
      </Link>
      <Link to="overview/projects" aria-label="overview">
        <StyledImage src={overview} />
      </Link>
    </ProjectNav>
  );
}

export default Navbar;
