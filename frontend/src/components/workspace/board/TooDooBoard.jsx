import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import TaskDescription from "../task/TaskDescription";
import { useBoard, useWorkspaces } from "../../../api/workspaceApi";
import { useParams } from "react-router-dom";


export default function TooDooBoard() {
    const [tasks, setTasks] = useState([]);
    const { getBoardTasks } = useBoard();

    const {boardName} = useParams();

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getBoardTasks(boardName);
            if (response.status === 200) {
                setTasks(response.data.tasks)
            }
        };

        fetchTasks();
    }, []);

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

    console.log(tasks);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="boards-wrapper toodoo">
                <BoardColumn columnId="toodoo" columnName="Toodoo" tasks={tasks.filter((task) => task.status.toLowerCase() === "toodoo")} />
                <BoardColumn columnId="inProgress" columnName="In progress" tasks={tasks.filter((task) => task.status.toLowerCase() === "inProgress")} />
                <BoardColumn columnId="done" columnName="Done" tasks={tasks.filter((task) => task.status.toLowerCase() === "done")} />
            </div>
        </DndContext>
    );
}