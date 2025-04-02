import { NavLink, Routes, Route, useParams } from "react-router-dom"

import WorkspaceMembers from "./members/WorkspaceMembers";
import WorkspaceSettings from "./settings/WorkspaceSettings";
import TooDooBoard from "./board/TooDooBoard";
import WorkspaceMenu from "./WorkspaceMenu";

import '../../css/workspace.css'
import WorkspaceHome from "./WorkspaceHome";
import Boards from "./board/Boards";

export default function Workspace() {
    const { workspaceName } = useParams();

    let isFree = true;
    return (
        <div className="workspace-home">
            <div className="workspace-header">
                <div className="workspace-menu-wrapper">
                    <div className="user-menu">
                        <NavLink to={`/workspace/${workspaceName}`} className="workspace-menu-header">
                            <div className="workspace-name-img">
                                <p className="namespace-letter">W</p>
                            </div>
                            <div className="workspace-name-wrapper">
                                <p className="workspace-name">Workspace name</p>
                                <p className="workspace-description">Free</p>
                            </div>
                        </NavLink>
                        <div className="workspace-menu-items">
                            <WorkspaceMenu name={workspaceName} />
                        </div>
                        <div className="workspace-boards-list">

                        </div>
                    </div>
                    <div className="workspace-upgrade-wrapper">
                        {isFree ? (
                            <NavLink to="/upgrade" className="workspace-upgrade-btn">
                                Upgrade to Pro
                            </NavLink>
                        ) : (
                            <NavLink to="/upgrade" className="workspace-upgrade-btn">
                                Upgrade to Pro
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<WorkspaceHome workspaceName={workspaceName} />} />
                <Route path="boards" element={<Boards />} />
                <Route path="members" element={<WorkspaceMembers />} />
                <Route path="settings" element={<WorkspaceSettings />} />
                <Route path="toodoo/:boardName" element={<TooDooBoard />} />
                <Route path="invite/:workspaceInvite" element={<TooDooBoard />} />
            </Routes>
        </div>
    )
}