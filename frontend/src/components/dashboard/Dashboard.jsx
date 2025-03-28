import '../../css/dashboard-home.css';

import WorkSpaceElement from './WorkSpaceElement';
import LatestBoard from './LatestBoard';
import Workspaces from './Workspaces';


const workspaces = [
    { id: 1, title: 'First workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
            {title: 'My Second Board', imgUrl: '/images/sky.jpg', link: '/workspace/board/1'},
            {title: 'My Third Board', imgUrl: '/images/lavender.jpg', link: '/workspace/board/1'},
        ] 
    },
    { id: 2, title: 'Second workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
            {title: 'My Second Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
            {title: 'My Third Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
        ] 
    },
    { id: 3, title: 'Third workspace', link: 'workspace', 
        boards: [
            {title: 'My First Board', imgUrl: '/images/sunset.jpg', link: `/workspace/board/1`},
            {title: 'My Second Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
            {title: 'My Third Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
            {title: 'My Fourth Board', imgUrl: '/images/sunset.jpg', link: '/workspace/board/1'},
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
                            <LatestBoard props={workspaces[0]} />
                        </div>
                    </div>
                    <div className="workspaces">
                        <h3>Your workspaces</h3>
                        <div className="workspaces-list-big">
                            {workspaces.map((item) => {
                                return <Workspaces props={item} key={item.id} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}