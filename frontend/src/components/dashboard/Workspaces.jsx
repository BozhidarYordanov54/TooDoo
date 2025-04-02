import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear, faPlus } from '@fortawesome/free-solid-svg-icons';

import CardLink from './CardLink';
import { useState } from 'react';

export default function Workspaces({ props }) {
    const [boards, setBoards] = useState([]);

    const addBoardHandler = async (e) => {
        e.preventDefault();

        // Assuming you have a function to add a new board to the workspace
        const newBoard = {
            id: boards.length + 1,
            name: `Board ${boards.length + 1}`,
            imgUrl: 'https://via.placeholder.com/150',
            link: `/workspace/${props.name}/toodoo/${boards.length + 1}`
        };

        console.log("adding board", newBoard);

        setBoards((prevBoards) => [...prevBoards, newBoard]);
    }

    return (
        <div key={props.id} className="workspace-wrapper">
            <div className="header-wrapper">
                <NavLink to={`/workspace/${props.name}`}>{props.name}</NavLink>
                <div className="actions">
                    <button className="add-new-board" onClick={addBoardHandler}>Add board <FontAwesomeIcon icon={faPlus} /></button>
                    <NavLink to={`/workspace/${props.name}/boards`}>Boards <FontAwesomeIcon icon={faTable} /></NavLink>
                    <NavLink to={`/workspace/${props.name}/members`}>Members <FontAwesomeIcon icon={faUsers} /></NavLink>
                    <NavLink to={`/workspace/${props.name}/settings`}>Settings <FontAwesomeIcon icon={faGear} /></NavLink>
                </div>
            </div>

            <div className="boards-wrapper">
                {boards.map((item, index) => {
                    // console.log(item);
                    return <CardLink name={item.name} key={item.id || index} imgURL={item.imgUrl} link={item.link} />
                })}
            </div>
        </div>
    )
}