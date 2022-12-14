import React, { useState, useEffect } from "react";
import { useTotals } from "../contexts/Total";
import Calendar from "react-calendar";

import styled from "styled-components";

const HeaderDiv = styled.header`
  /* position: fixed; */
  top: 0;
  width: 100vw;
  left: 0;
  position: fixed;
  background-color: #ef6e26;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const ModuleName = styled.h1`
  text-align: left;
  font-size: 2em;
  margin-left: 0.7em;
`;

const CalenderStyle = styled.section`
  margin-top: -7em;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1em;
  margin-bottom: -21em;
  overflow: scroll;
  width: 19em;
  height: 19em;
`;

function CalenderPage() {
  const [date, setDate] = useState(new Date());
  const {
    todos,
    getTodos,
    startDate,
    setStartDate,
    timelog,
    getAllTimelogs,
    deleteTimelog,
  } = useTotals();

  const onChange = (date) => {
    setDate(date);
  };

  function removeTimelog(id) {
    deleteTimelog(id);
  }

  useEffect(() => {
    getTodos();
    getAllTimelogs();
  }, []);
  console.log(todos);
  return (
    <div>
      <HeaderDiv>
        <ModuleName>Kalender</ModuleName>
      </HeaderDiv>
      <CalenderStyle>
        <Calendar onChange={onChange} value={date} />
      </CalenderStyle>
      <section>
        <TodoList>
          {timelog
            .filter((log) => {
              const target = new Date(log.start);
              const selectedDate = new Date(date);
              return (
                target.getMonth() === selectedDate.getMonth() &&
                target.getDate() === selectedDate.getDate() &&
                target.getFullYear() === selectedDate.getFullYear()
              );
            })
            .map((log) => {
              const targetTodo = todos.find((todo) => todo.id === log.taskId);
              return (
                <li key={log.id}>
                  {targetTodo.title}---{log.time}seconds
                  <button onClick={() => removeTimelog(log.id)}>delete</button>
                </li>
              );
            })}
        </TodoList>
      </section>
    </div>
  );
}

export default CalenderPage;
