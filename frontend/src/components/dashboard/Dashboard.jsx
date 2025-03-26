import '../../css/dashboard-home.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTable, faGear, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import WorkSpaceElement from './WorkSpaceElement';
import { useState } from 'react';

export default function Dashboard() {
    const[latestBoards, setLatestBoards] = useState([]);

    return (
        <>
            <div className="dashboard-wrapper">
                <div className="side-menu">
                    <h2 className="side-menu-header">Menu</h2>
                    <div className="actions-wrapper">
                        <button type='submit' className="add-new-workspace">Add workspace</button>

                    </div>
                    <div className="workspaces-wrapper">
                        <p className='workspaces'>Workspaces</p>
                        <ul className='workspaces-list'>
                            <WorkSpaceElement />
                            <WorkSpaceElement />
                            <WorkSpaceElement />
                            <WorkSpaceElement />
                        </ul>
                    </div>
                </div>
                <div className="main-content">
                    <div className="latest-boards cards-container">
                        <h2>Latest boards</h2>
                        <div className="boards-wrapper cards-wrapper">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                    <div className="workspaces">
                        <h3>Your workspaces</h3>
                        <div className="workspace-wrapper">
                            <div className="header-wrapper">
                                <h4>Workspace name</h4>
                                <div className="actions">
                                    <NavLink to='/board/members'>Boards <FontAwesomeIcon icon={faTable}/></NavLink>
                                    <NavLink to='/board/members'>Members <FontAwesomeIcon icon={faUsers}/></NavLink>
                                    <NavLink to='/board/settings'>Settings <FontAwesomeIcon icon={faGear}/></NavLink>
                                </div>
                            </div>

                            <div className="boards-wrapper">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}