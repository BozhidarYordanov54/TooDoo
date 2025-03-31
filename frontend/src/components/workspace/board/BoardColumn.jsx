import { useDroppable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./TaskCard";

export default function BoardColumn({ columnId, tasks, columnName }) {
    const { isOver, setNodeRef } = useDroppable({ id: columnId });

    return (
        <div className={`board-column-container ${isOver ? "hovered" : ""}`} ref={setNodeRef}>
            <div >
                <h3 className="task-name">{columnName}</h3>
                <div className="task-list">
                    {tasks.map((task) => {
                        return (<TaskCard key={task.id} id={task.id} content={task.content} parent={columnId} />)
                    })}
                </div>
            </div>
            <div className="add-task-wrapper">
                <button className="add-task-button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
}
