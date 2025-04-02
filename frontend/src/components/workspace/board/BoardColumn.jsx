import { useDroppable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./TaskCard";
import AddTaskForm from "../../forms/AddTaskForm";

export default function BoardColumn({ columnId, tasks, columnName }) {
    const { isOver, setNodeRef } = useDroppable({ id: columnId });

    const openTaskForm = () => {
        document.querySelector(".form-wrapper.add-task").classList.toggle("active");
    }

    return (
        <>
            <div className={`board-column-container ${isOver ? "hovered" : ""}`} ref={setNodeRef}>
                <div >
                    <h3 className="task-name">{columnName}</h3>
                    <div className="task-list">
                        {tasks.map((task) => {
                            return (<TaskCard key={task.id} id={task.id} content={task} status={columnId} />)
                        })}
                    </div>
                </div>
                <div className="add-task-wrapper">
                    <button onClick={openTaskForm} className="add-task-button">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <AddTaskForm/>
        </>
    );
}
