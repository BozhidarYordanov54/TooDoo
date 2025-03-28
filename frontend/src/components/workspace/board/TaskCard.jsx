import { useDrag } from "react-dnd";


export default function TaskCard({ item, index, columnId, moveTask, ItemType }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: item.id, index, columnId },
        collect: (monitor) => ({ 
            isDragging: !!monitor.isDragging() ,
            offset: monitor.getClientOffset()
        }),
    });

    return (
        <div
            ref={drag}
            className={`task-card ${isDragging ? " dragging" : ""}`}
        >
            {item.content}
        </div>
    );
}