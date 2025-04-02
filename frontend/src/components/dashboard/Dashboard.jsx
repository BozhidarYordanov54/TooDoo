import '../../css/dashboard-home.css';

import WorkSpaceElement from './WorkSpaceElement';
import LatestBoard from './LatestBoard';
import Workspaces from './Workspaces';
import AddWorkspaceForm from './AddWorkspaceForm';
import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';


export default function Dashboard() {
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axiosPrivate.get('api/workspace/all');

                setWorkspaces(data.data);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isLoading]);

    const handleFormOpen = () => {
        document.querySelector('.form-wrapper').classList.add('active');
        document.body.classList.add('no-scroll');
    }

    const handleFormClose = () => {
        const formWrapper = document.querySelector('.form-wrapper');
        if (!formWrapper) {
            console.warn("Form wrapper not found");
            return;
        }
        
        formWrapper.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    const addWorkspace = (newWorkspace) => {
        try {
            setIsLoading(true);
            setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
        }
        catch (error) {
            console.error('Error adding workspace:', error);
        } finally{
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <>
            <AddWorkspaceForm handlerClose={handleFormClose} addWorkspace={addWorkspace} isLoading={setIsLoading} />
            <div className="dashboard-wrapper">
                <div className="side-menu">
                    <h2 className="side-menu-header">Menu</h2>
                    <div className="actions-wrapper">
                        <button type='button' onClick={handleFormOpen} className="btn add-new-workspace">Add workspace</button>
                    </div>
                    <div className="workspaces-wrapper">
                        <p className='workspaces'>Workspaces</p>
                        <ul className='workspaces-list'>
                            {workspaces.map((item) => {
                                return <WorkSpaceElement key={item.id} props={item} />
                            })}
                        </ul>
                    </div>
                </div>
                <div className="main-content">
                    <div className="latest-boards cards-container">
                        <h2>Latest boards</h2>
                        <div className="boards-wrapper cards-wrapper">
                            {workspaces[0] ? (
                                <LatestBoard props={workspaces[0]} />
                            ) : (
                                <p>No boards available</p>
                            )}
                        </div>
                    </div>
                    <div className="workspaces">
                        <h3>Your workspaces</h3>
                        <div className="workspaces-list-big">
                            {workspaces.map((item) => {
                                return <Workspaces key={item.id} props={item} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}