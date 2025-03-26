import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

import "../../css/header.css";
import { AuthContext } from "../../context/AuthContext";

const loggedOutLinks = [
    { key: "1", path: "/", text: "Home" },
    { key: "2", path: "/pricing", text: "Pricing" },
    { key: "3", path: "auth/login", text: "Login" },
];

const loggedInLinks = [
    { key: "1", path: "/", text: "Home" },
    { key: "2", path: "dashboard", text: "Dashboard" },
    { key: "3", path: "user/profile", text: "Profile" },
    { key: "4", path: "/", text: "Logout" },
];

export default function Header() {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);

    return (
        <header className="site-header">
            <NavLink className="logo-wrapper" to="/">
                <div className="logo">
                    <FontAwesomeIcon icon={faSquareCheck} />
                </div>
                <p className="brand-name">TooDoo</p>
            </NavLink>

            <nav className="site-nav">
                <ul className="nav-list">
                    {isAuthenticated
                        ? loggedInLinks.map((link) => {
                            return (
                                <li key={link.key} className="nav-item">
                                    <NavLink
                                        to={link.path}
                                        className={`nav-link ${link.text == "Logout" ? "auth" : ""
                                            }`}
                                        onClick={link.text == `Logout` ? handleLogout : ""}
                                    >
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        })
                        : loggedOutLinks.map((link) => {
                            return (
                                <li key={link.key} className="nav-item">
                                    <NavLink
                                        to={link.path}
                                        className={`nav-link ${link.text == `Login` ? "auth" : ""
                                            }`}
                                    >
                                        {link.text}
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </header>
    );
}
