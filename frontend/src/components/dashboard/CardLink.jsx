import { NavLink } from "react-router-dom"

export default function CardLink({ link, name, imgURL }) {
    return (
        <NavLink to={`${link}`}>
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