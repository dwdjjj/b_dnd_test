import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
  margin: 8px;
  border: 3px solid lightgrey;
  border-radius: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${(props) => (props.isDraggingOver ? "orange" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({ key, column, tasks, isDropDisabled }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
        // type={column.id === "column-2" ? "done" : "active"} // type으로 Droppable영역 비활성화 가능
      >
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
