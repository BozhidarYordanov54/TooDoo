import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import TaskDescription from "../task/TaskDescription";
import { useBoard, useWorkspaces } from "../../../api/workspaceApi";
import { useParams } from "react-router-dom";


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


export default function TooDooBoard() {
    const [tasks, setTasks] = useState([]);
    const { getBoardTasks } = useBoard();

    const { boardName } = useParams();

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getBoardTasks(boardName);
            if (response.status === 200) {
                setTasks(response.data.tasks);
            }
        };

        fetchTasks();
    }, []);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === active.id ? { ...task, status: over.id } : task
                )
            );
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="boards-wrapper toodoo">
                <BoardColumn columnId="TooDoo" columnName="Toodoo" tasks={tasks.filter((task) => task.status === "TooDoo")} />
                <BoardColumn columnId="InProgress" columnName="In progress" tasks={tasks.filter((task) => task.status === "InProgress")} />
                <BoardColumn columnId="Done" columnName="Done" tasks={tasks.filter((task) => task.status === "Done")} />
            </div>
        </DndContext>
    );
}