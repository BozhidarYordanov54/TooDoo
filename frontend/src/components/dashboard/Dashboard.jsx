import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../auth/PrivateRoute';
import { useState } from 'react';

import '../../css/dashboard-home.css';

import WorkSpaceElement from './WorkSpaceElement';
import LatestBoard from './LatestBoard';
import Workspace from './Workspace';


const workspaces = [
    { id: 1, title: 'First workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: 'board'},
            {title: 'My Second Board', imgUrl: '/images/sky.jpg', link: 'board'},
            {title: 'My Third Board', imgUrl: '/images/lavender.jpg', link: 'board'},
        ] 
    },
    { id: 2, title: 'Second workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: 'board'},
            {title: 'My Second Board', imgUrl: '/images/sunset.jpg', link: 'board'},
            {title: 'My Third Board', imgUrl: '/images/sunset.jpg', link: 'board'},
        ] 
    },
    { id: 3, title: 'Third workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: 'board'},
            {title: 'My Second Board', imgUrl: '/images/sunset.jpg', link: 'board'},
            {title: 'My Third Board', imgUrl: '/images/sunset.jpg', link: 'board'},
        ] 
    },
];

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
                            <LatestBoard props={workspaces} />
                        </div>
                    </div>
                    <div className="workspaces">
                        <h3>Your workspaces</h3>
                        <div className="workspaces-list-big">
                            {workspaces.map((item) => {
                                return <Workspace props={item} key={item.id} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}