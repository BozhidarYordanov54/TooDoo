import { NavLink } from "react-router-dom"

export default function CardLink({ link, title, imgURL }) {
    console.log(imgURL);
    return (
        <NavLink to={`${link}`}>
            <div className="template board">
                <div className="img-wrapper">
                    <img src={imgURL} alt="template" />
                </div>
                <div className="text-wrapper">
                    <h3>{title}</h3>
                </div>
            </div>
        </NavLink>
    )
}