export default function TaskDescription({ id }) {
    return (
        <div className="task-description-container">
            <div className="task-description-header">
                <h3 className="task-name">Task name</h3>
                <div className="task-description-header-buttons">
                    <button className="task-description-button">Edit</button>
                    <button className="task-description-button">Delete</button>
                </div>
            </div>
            <div className="task-description-content">
                <p className="task-description-text">Description for Task 1 aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                <p className="task-description-text">Due date: 2023-10-01</p>
                <p className="task-description-text">Priority: High</p>
            </div>
        </div>
    )
}