import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import WorkspaceMenu from '../workspace/WorkspaceMenu';

export default function WorkSpaceElement({ link }) {

    const handleFolding = (event) => {
        const workspaceElement = event.currentTarget.closest('li');
        const workspaceTable = workspaceElement.querySelector('.workspace-table');
        const workspaceName = workspaceElement.querySelector('.workspace-name');

        workspaceTable.classList.toggle('folded');
        workspaceName.classList.toggle('active');
    }

    return (
        <li>
            <button className='workspace-name folded' onClick={handleFolding}>
                <div className="workspace-symbol">
                    <p>W</p>
                </div>
                <p>Workspace name</p>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className='workspace-table folded'>
                <WorkspaceMenu/>
            </ul>
        </li>
    )
}