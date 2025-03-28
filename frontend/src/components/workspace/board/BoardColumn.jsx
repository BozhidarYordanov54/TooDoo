import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

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
        <div ref={drop} className="board-column">
            <h3>{column.title}</h3>
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
    );
}