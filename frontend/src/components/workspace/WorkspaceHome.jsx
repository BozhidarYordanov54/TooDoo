import { NavLink, Routes, Route } from "react-router-dom"

import WorkspaceMembers from "./members/WorkspaceMembers";
import WorkspaceSettings from "./settings/WorkspaceSettings";
import TooDooBoard from "./board/TooDooBoard";
import WorkspaceMenu from "./WorkspaceMenu";

import '../../css/workspace.css'

export default function WorkspaceHome() {
    let isFree = true;
    return (
        <div className="workspace-home">
            <div className="workspace-header">
                <div className="workspace-menu-wrapper">
                    <div className="workspace-menu-header">
                        <div className="workspace-name-img">
                            <p className="namespace-letter">W</p>
                        </div>
                        <div className="workspace-name-wrapper">
                            <p className="workspace-name">Workspace name</p>
                            <p className="workspace-description">Free</p>
                        </div>
                    </div>
                    <div className="workspace-menu-items">
                        <WorkspaceMenu />
                    </div>
                    <div className="workspace-boards-list">
                        
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
                <Route path="boards/:workspaceID" element={<div>Boards</div>} />
                <Route path="toodoo/:boardId" element={<TooDooBoard />} />
                <Route path="members/:workspaceID" element={<WorkspaceMembers />} />
                <Route path="settings/:workspaceID" element={<WorkspaceSettings />} />
            </Routes>
        </div>
    )
}