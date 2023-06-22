import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useTotals } from "../../contexts/Total";

const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
`;

const ModalOverlay = styled.a`
  background: rgba(247, 248, 249, 0.75);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalClose = styled.a`
  float: right !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  height: 25rem;
  max-height: 75vh;
  max-width: 850px;
  padding: 0 0.8rem;
  width: 100%;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
`;

const ModalBody = styled.div`
  overflow-y: auto;
  padding: 10px 10px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #303742;
  padding: 20px 5px 10px 5px;
`;

const ModalTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

const ModalFooter = styled.div`
  padding: 10px 0px;
  text-align: center;
  margin-bottom: 3rem;
`;

const InputNewTodo = styled.input`
  text-align: center;
  max-width: 15em;
  height: 2em;
`;

const NameLabel = styled.label`
  color: black;
  padding: 0.3rem;
`;

const ProjectInput = styled.input`
  max-width: 15em;
  height: 2em;
`;

const ModalInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem;
  color: black;
`;

const Modal = ({ title, footer, children, active, hideModal }) => {
  const { input, setInput, input2, setInput2, addProject } = useTotals();

  return (
    <Fragment>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalClose onClick={() => hideModal()}>X</ModalClose>
            </ModalHeader>
            <ModalInputDiv>
              <ModalName>Create new Todo</ModalName>
              <NameLabel htmlFor="todo">Todo:</NameLabel>
              <InputNewTodo
                type="text"
                value={input}
                id="todos"
                required
                onChange={(e) => setInput(e.target.value)}
              />
              <NameLabel>Project name:</NameLabel>
              <ProjectInput
                type="text"
                value={input2}
                id="project"
                required
                onChange={(e) => setInput2(e.target.value)}
              />
              <NameLabel onChange={(e) => addProject(e.project.color)}>
                Select your favorite color:
              </NameLabel>
              <input type="color" />
            </ModalInputDiv>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>{footer}</ModalFooter>
          </ModalContainer>
        </ModalBlock>
      )}
    </Fragment>
  );
};
export default Modal;
