import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import { useState } from 'react';

import '../../css/dashboard-home.css';

import WorkSpaceElement from './WorkSpaceElement';
import LatestBoard from './LatestBoard';
import Workspace from './Workspace';

import imageURL from '../../static/images/best-iphone-calendar-apps.jpg';

const data = {
    id: 1,
    imgUrl: imageURL,
    title: 'Board 1',
    link: 'workspace'
}

export default function Dashboard() {
    return (
        <>
            <div className="dashboard-wrapper">
                <div className="side-menu">
                    <h2 className="side-menu-header">Menu</h2>
                    <div className="actions-wrapper">
                        <button type='submit' className="btn add-new-workspace">Add workspace</button>
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
                            <LatestBoard props={data} />
                        </div>
                    </div>
                    <div className="workspaces">
                        <h3>Your workspaces</h3>
                        <div className="workspaces-list-big">
                            <Workspace props={data} />
                            <Workspace props={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}