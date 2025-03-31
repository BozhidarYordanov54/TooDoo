import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function BoardColumn({ columnId, column, moveTask, ItemType }) {
    const [, drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
            if (item.columnId !== columnId) {
                moveTask(item, columnId);
            }
        },
    });

    return (
        <div className="board-column-container">
            <div className="board-column">
                <div ref={drop} >
                    <h3 className="task-name">{column.title}</h3>
                    {column.items.map((item, index) => (
                        <TaskCard
                            key={item.id}
                            item={item}
                            index={index}
                            columnId={columnId}
                            moveTask={moveTask}
                            ItemType={ItemType}
                        />
                    ))}
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