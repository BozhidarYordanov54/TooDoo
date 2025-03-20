import '../../css/dashboard-home.css';

export default function Dashboard(){
    return(
        <>
            <div className="side-menu">
                <h2>Dashboard</h2>
                <div className="workspaces-wrapper">
                    <h3>Workspaces</h3>
                    <ul>
                        <li>Workspace 1</li>
                        <li>Workspace 2</li>
                        <li>Workspace 3</li>
                    </ul>
                </div>
            </div>
        </>
    )
}