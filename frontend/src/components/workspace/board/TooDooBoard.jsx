import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import TaskDescription from "../task/TaskDescription";


const initialTasks = [
    {
        id: "1", content: {
            title: "Task 1",
            description: "Description for Task 1 aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            dueDate: "2023-10-01",
            priority: "High",
        }, parent: "toodoo"
    },
    {
        id: "2", content: {
            title: "Task 2",
            description: "Description for Task 2",
            dueDate: "2023-10-02",
            priority: "Medium",
        }, parent: "toodoo"
    },
    {
        id: "3", content: {
            title: "Task 3",
            description: "Description for Task 3",
            dueDate: "2023-10-03",
            priority: "Low",
        }, parent: "inProgress"
    },
];

import imageURL from '/images/sky.jpg';

export default function TooDooBoard() {
    const [tasks, setTasks] = useState(initialTasks);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === active.id ? { ...task, parent: over.id } : task
                )
            );
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>

            <div className="boards-wrapper toodoo">
                <BoardColumn columnId="toodoo" columnName="Toodoo" tasks={tasks.filter((task) => task.parent === "toodoo")} />
                <BoardColumn columnId="inProgress" columnName="In progress" tasks={tasks.filter((task) => task.parent === "inProgress")} />
                <BoardColumn columnId="done" columnName="Done" tasks={tasks.filter((task) => task.parent === "done")} />
            </div>
        </DndContext>
    );
}