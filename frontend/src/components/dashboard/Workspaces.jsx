import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear, faPlus, faHomeLg } from '@fortawesome/free-solid-svg-icons';

import AddBoardForm from '../forms/AddBoardForm';

import CardLink from './CardLink';
import { useState } from 'react';

export default function Workspaces({ props }) {
    const [boards, setBoards] = useState(props.boards || []);
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div key={props.id} className="workspace-wrapper">
            <div className="header-wrapper">
                <NavLink className="workspace-name-card" to={`/workspace/${props.name}`}>{props.name}</NavLink>
                <div className="actions">
                    <NavLink to={`/workspace/${props.name}/boards`}>Boards <FontAwesomeIcon icon={faTable} /></NavLink>
                    <NavLink to={`/workspace/${props.name}/members`}>Members <FontAwesomeIcon icon={faUsers} /></NavLink>
                    <NavLink to={`/workspace/${props.name}/settings`}>Settings <FontAwesomeIcon icon={faGear} /></NavLink>
                </div>
            </div>

            <div className="boards-wrapper">
                {boards.map((item, index) => {
                    {/* Debugging statement removed */}
                    return <CardLink key={item.id || index} name={item.name} imgURL={item.imageUrl} workspaceName={props.name} />
                })}
                <AddBoardForm workspaceName={props.name} setBoards={setBoards} />
            </div>
        </div>
    )
}