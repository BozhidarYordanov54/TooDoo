import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkspaces } from "../../api/workspaceApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddTaskForm() {
    const { createTask, getWorkspaceMembers } = useWorkspaces();
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [workspaceMembers, setWorkspaceMembers] = useState([]);

    const { workspaceName, boardName } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createTask(boardName, taskTitle, taskDescription, taskDueDate, taskPriority, assignedUserId);

            if (response.status === 200) {
                handleFormClose();
            } else {
                console.error("Failed to create task:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

    useEffect(() => {
        const fetchWorkspaceMembers = async () => {
            const response = await getWorkspaceMembers(workspaceName);

            if (response.status === 200) {
                setWorkspaceMembers(response.data);
            }
        }

        fetchWorkspaceMembers();
    }, [])

    const handleFormClose = () => {
        const formWrapper = document.querySelector('.form-wrapper.add-task');
        if (!formWrapper) {
            console.warn("Form wrapper not found");
            return;
        }

        formWrapper.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    return (
        <>
            <div className="form-wrapper add-task">
                <form className="form add-task" onSubmit={handleSubmit}>
                    <h2>Add Task</h2>
                    <div className="form-group">
                        <input type="text" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                        <label htmlFor="taskTitle">Task Title</label>
                    </div>
                    <div className="form-group">
                        <textarea id="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                        <label htmlFor="taskDescription">Task Description</label>
                    </div>
                    <div className="form-group date">
                        <input type="date" id="taskDueDate" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                        <label htmlFor="taskDueDate">Due Date</label>
                    </div>
                    <div className="form-group select">
                        <select id="taskPriority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group select">
                        <select name="" id="" value={assignedUserId} onChange={(e) => setAssignedUserId(e.target.value)}>
                            <option value="">Assign to...</option>
                            {workspaceMembers.map((member) => (
                                <option key={member.id} value={member.id}>{member.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn">Add Task</button>
                </form>
                <button type="button" className="btn btn-close" onClick={handleFormClose}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </>
    );
}