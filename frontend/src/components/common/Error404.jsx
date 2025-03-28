import { NavLink } from "react-router-dom";

import "../../css/error-page.css";

export default function Error404() {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">404</h1>
                <p className="error-subtitle">Page Not Found</p>
                <p className="error-text">Ooops, it's a dead end...</p>
                <NavLink to="/" className="error-button">Back to Home</NavLink>
            </div>
            <div className="error-image">
                <img src="../../assets/astronaut.png" alt="Floating astronaut" />
            </div>
        </div>
    );
}
