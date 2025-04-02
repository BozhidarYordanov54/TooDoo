import { NavLink } from "react-router-dom"

export default function CardLink({ workspaceName, name, imgURL }) {
    return (
        <NavLink to={`/workspace/${workspaceName}/toodoo/${name}`}>
            <div className="template board">
                <div className="img-wrapper">
                    <img src={imgURL} alt="template" />
                </div>
                <div className="text-wrapper">
                    <h3>{name}</h3>
                </div>
            </div>
        </NavLink>
    )
}