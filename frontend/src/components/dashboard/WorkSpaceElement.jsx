import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import WorkspaceMenu from '../workspace/WorkspaceMenu';

export default function WorkSpaceElement({ props }) {

    if (!props || !props.name) {
        return null; // Prevent rendering if data is missing
    }

    const handleFolding = (event) => {
        const workspaceElement = event.currentTarget.closest('li');
        const workspaceTable = workspaceElement.querySelector('.workspace-table');
        const workspaceName = workspaceElement.querySelector('.workspace-name');

        workspaceTable.classList.toggle('folded');
        workspaceName.classList.toggle('active');
    }

    const backgroundColor = [
        props.name.charCodeAt(0).toString(16).padStart(2, '0'),
        props.name.charCodeAt(props.name.length - 1).toString(16).padStart(2, '0'),
        props.name.charCodeAt(Math.floor(props.name.length / 2)).toString(16).padStart(2, '0')
    ].join('');
    
    return (
        <li>
            <button className='workspace-name folded' onClick={handleFolding}>
                <div style={{ backgroundColor: `#${backgroundColor}` }} className="workspace-symbol">
                    <p>{props.name[0].toUpperCase()}</p>
                </div>
                <p>{props.name}</p>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className='workspace-table folded'>
                <WorkspaceMenu name={props.name} />
            </ul>
        </li>
    )
}