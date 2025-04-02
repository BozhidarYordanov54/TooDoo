import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTable, faGear } from "@fortawesome/free-solid-svg-icons";

export default function WorkspaceMenu({name}) {
    return (
        <>
            <NavLink to={`/workspace/${name}/boards`}><FontAwesomeIcon icon={faTable}/> Boards</NavLink>
            <NavLink to={`/workspace/${name}/members`}><FontAwesomeIcon icon={faUsers}/> Members</NavLink>
            <NavLink to={`/workspace/${name}/settings`}><FontAwesomeIcon icon={faGear}/> Settings</NavLink>
        </>
    );
}