import { useParams } from "react-router-dom";

export default function WorkspaceSettings() {
    const { workspaceName } = useParams();

    return (
        <div className="workspace-settings">
            <div className="settings-container">
                <h1>Settings for {workspaceName}</h1>
                <p>Workspace settings will be here</p>
            </div>
        </div>
    )
}