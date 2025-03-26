import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear } from '@fortawesome/free-solid-svg-icons';

import CardLink from './CardLink';

export default function Workspace({ props }) {
    return (
        <div className="workspace-wrapper">
            <div className="header-wrapper">
                <h4>Workspace name</h4>
                <div className="actions">
                    <NavLink to='/board/members'>Boards <FontAwesomeIcon icon={faTable} /></NavLink>
                    <NavLink to='/board/members'>Members <FontAwesomeIcon icon={faUsers} /></NavLink>
                    <NavLink to='/board/settings'>Settings <FontAwesomeIcon icon={faGear} /></NavLink>
                </div>
            </div>

            <div className="boards-wrapper">
                <CardLink title={props.title} imgURL={props.imgUrl} link={props.title} />
                <CardLink title={props.title} imgURL={props.imgUrl} link={props.title} />
                <CardLink title={props.title} imgURL={props.imgUrl} link={props.title} />
            </div>
        </div>
    )
}