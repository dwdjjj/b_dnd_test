import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";
import styled from "styled-components";
import "@atlaskit/css-reset";

const Container = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  fles-flow: row wrap;
  @media (min-width: 400px) {
  }
  @media (min-width: 500px) {
    width: 35%;
  }
  @media (min-width: 500px) {
    margin-left: auto;
    margin-right: auto;
    width: auto;
  }
`;
function App() {
  const [state, setState] = useState(() => initialData);
  const [homeIndex, setHomeindex] = useState(() => {});
  const onDragStart = (start) => {
    document.body.style.color = "red";
    document.body.style.transition = "background-color 0.5s ease";
    setHomeindex(state.columnOrder.indexOf(start.source.droppableId));
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };
  const onDragEnd = (result) => {
    setHomeindex(null);
    // destination : 마지막 위치, source : 시작 위치
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId } = result;

    // droppableId는 어느 column에 위치하는지, index는 해당 column에서 몇번째 task인지
    console.log(destination?.index, destination?.droppableId);
    console.log(source.index, source.droppableId);

    // 올바른 droppable 위에 두지 않았으므로 그냥 리턴
    if (!destination) {
      return;
    }

    // 같은자리에 두면 그냥 리턴
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1); // 현재 인덱스 제거
      newTaskIds.splice(destination.index, 0, draggableId); // drop한 곳 인덱스에 해당 id넣기.

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // 다른 droppable로 옮기기
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          const isDropDisabled = index < state.homeIndex;
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
