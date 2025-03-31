import { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BoardColumn from "./BoardColumn";

const ItemType = "CARD";

export default function TooDooBoard() {
    const [columns, setColumns] = useState({
        todo: { title: "Too Doo", items: [{ id: "1", content: "Task 1" }, { id: "2", content: "Task 2" }] },
        inProgress: { title: "In Progress", items: [] },
        done: { title: "Done", items: [] },
    });

    const moveTask = (task, newColumnId) => {
        setColumns((prevColumns) => {
            const sourceColumn = prevColumns[task.columnId];
            const destColumn = prevColumns[newColumnId];
            const taskItem = sourceColumn.items.find((item) => item.id === task.id);

            return {
                ...prevColumns,
                [task.columnId]: { ...sourceColumn, items: sourceColumn.items.filter((item) => item.id !== task.id) },
                [newColumnId]: { ...destColumn, items: [...destColumn.items, taskItem] },
            };
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="workspace-header">
                <h1>TooDoo Board</h1>
                <div className="board-header">
                    <h2>Board Name</h2>
                </div>
            </div>
            <div className="board-container">
                {Object.entries(columns).map(([columnId, column]) => (
                    <BoardColumn key={columnId} columnId={columnId} column={column} moveTask={moveTask} ItemType={ItemType} />
                ))}
            </div>
        </DndProvider>
    );
}
