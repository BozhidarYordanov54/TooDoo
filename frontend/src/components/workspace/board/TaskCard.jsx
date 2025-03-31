import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ id, content, parent }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    let isDragging = false;

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    };

    return (
        <>
            <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`task-card ${parent}  ${content.priority.toLowerCase()} ${transform ? "dragging" : ""}`}>
                <div className="task-info">
                    <h4 className="task-title">{content.title}</h4>
                    <span className="task-due-date">Due: {content.dueDate}</span>
                </div>
                <div className="checkbox-wrapper-12">
                    <div className="cbx">
                        <input id="cbx-12" type="checkbox" />
                        <label htmlFor="cbx-12"></label>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                            <path d="M2 8.36364L6.23077 12L13 2"></path>
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo-12">
                                <fegaussianblur in="SourceGraphic" stdDeviation="4" result="blur"></fegaussianblur>
                                <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                                <feblend in="SourceGraphic" in2="goo-12"></feblend>
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
            
        </>
    );
}
