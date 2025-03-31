import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTable, faGear } from "@fortawesome/free-solid-svg-icons";

export default function WorkspaceMenu({id}) {
    return (
        <>
            <NavLink to={`/workspace/boards/${id}`}><FontAwesomeIcon icon={faTable}/>Boards</NavLink>
            <NavLink to={`/workspace/members/${id}`}><FontAwesomeIcon icon={faUsers}/>Members</NavLink>
            <NavLink to={`/workspace/settings/${id}`}><FontAwesomeIcon icon={faGear}/>Settings</NavLink>
        </>
    );
}