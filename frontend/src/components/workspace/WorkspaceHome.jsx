import { NavLink, Routes, Route } from "react-router-dom"

import WorkspaceMembers from "./members/WorkspaceMembers";
import WorkspaceSettings from "./settings/WorkspaceSettings";
import TooDooBoard from "./board/TooDooBoard";

import '../../css/workspace.css'

export default function WorkspaceHome() {
    return (
        <div className="workspace-home">
            <div className="workspace-header">
                <h1>Workspace Menu</h1>
                <NavLink to="/workspace/boards/1">Boards</NavLink>
                <NavLink to="/workspace/members/1">Members</NavLink>
                <NavLink to="/workspace/settings">Settings</NavLink>
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