import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../auth/AuthContext';

import '../../css/header.css';

const loggedOutLinks = [
    { to: '/pricing', text: 'Pricing' },
    { to: 'auth/login', text: 'Login' },
];

const loggedInLinks = [
    { to: 'user/profile', text: 'Profile' },
    { to: '/', text: 'Logout' },
]

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(!!user);
        }
    }, [user]);
    
    const handleLogout = () => {
        try {
            logout();
            setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
        }
    }

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
                    {
                        isAuthenticated ? loggedInLinks.map((link, index) => {
                            return (
                                <li key={index} className="nav-item">
                                    <NavLink to={link.to} className={`nav-link ${link.text == "Logout" ? 'auth' : ''}`} onClick={link.text == "Logout" ? handleLogout : ""}>{link.text}</NavLink>
                                </li>
                            )
                        }) : loggedOutLinks.map((link, index) => {
                            return (
                                <li key={index} className="nav-item">
                                    <NavLink to={link.to} className={`nav-link ${link.text == "Login" ? 'auth' : ''}`}>{link.text}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    );
}
