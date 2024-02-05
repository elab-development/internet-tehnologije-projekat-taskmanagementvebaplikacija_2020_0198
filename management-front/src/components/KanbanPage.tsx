
import XDrop from "./drop";
import XDrag from "./drag";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import styled from "styled-components";
import { initialData } from "../static/data";
import XColumn from "./column";
import { addTask, deleteTask, onChange } from "../utils";

const CSS = styled.div`
  .column-content {
    display: flex;
  }
`;

export default function KanbanPage() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (res: DropResult) => {
    const { source, destination, draggableId } = res;
    if (!destination) return;
    if (onChange(source, destination)) return;
    if (res.type === "TASK") {
      let newData = deleteTask(data, source);
      newData = addTask(newData, destination, draggableId);
      setData(newData);
    }
    if (res.type === "COLUMN") {
      let columnOrder = [...data.columnOrder];
      columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, draggableId);
      data.columnOrder = columnOrder;
      setData({ ...data });
    }
  };

  return (
    <CSS className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <XDrop
          className="column-content"
          droppableId="all-columns"
          type="COLUMN"
          direction="horizontal"
        >
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <XDrag
                key={columnId}
                draggableId={columnId}
                index={index}
                dragAll={false}
              >
                <XColumn column={column} tasks={tasks} />
              </XDrag>
            );
          })}
        </XDrop>
      </DragDropContext>
    </CSS>
  );
}