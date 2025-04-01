import { useState } from "react";

import { useWorkspace } from "../../api/workspaceApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddWorkspaceForm({ handlerClose, addWorkspace, isLoading }) {
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');

    const { createWorkspace } = useWorkspace();

    const handleSubmit = async (e) => {
        e.preventDefault();
        isLoading(true);

        const response = await createWorkspace(workspaceName, workspaceDescription);
        console.log("API Response:", response);

        if (response?.status === 200 && response.data?.name) {
            addWorkspace(response.data);
        } else {
            console.error("Error creating workspace or missing data");
        }

        isLoading(false);
        handlerClose();
    };


    const workspaceNameHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setWorkspaceName(e.target.value);
    }

    const workspaceDescriptionHandler = (e) => {
        if (e.target.value.length > 0) {
            e.target.classList.add("filled");
        }

        setWorkspaceDescription(e.target.value);
    }

    return (
        <>
            <div className="form-wrapper">
                <h2 className="form-header">Add new workspace</h2>
                <form className="form add-workspace" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <input type="text" name="workspaceName" id="workspaceName" value={workspaceName} onChange={workspaceNameHandler} />
                        <label htmlFor="workspaceName">Workspace name</label>
                    </div>
                    <div className="form-group">
                        <textarea name="workspaceDescription" id="workspaceDescription" cols="30" rows="10" value={workspaceDescription} onChange={workspaceDescriptionHandler}></textarea>
                        <label htmlFor="workspaceDescription">Workspace description</label>
                    </div>
                    <div className="form-group">
                        <button type="submit" >Create Workspace</button>
                    </div>
                </form>
                <button type="button" className="btn btn-close" onClick={handlerClose}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </>
    )
}