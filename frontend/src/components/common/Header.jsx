import { NavLink } from 'react-router';

import '../../css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

const links = [
    { to: '/pricing', text: 'Pricing' },
    { to: 'auth/login', text: 'Login' }
];

export default function Header() {
    return (
        <>
            <header className="site-header">
                <NavLink className="logo-wrapper" to={'/'}>
                    <div className="logo">
                        <FontAwesomeIcon icon={faSquareCheck} />
                    </div>
                    <p className="brand-name">TooDoo</p>
                </NavLink>

                <nav className="site-nav">
                    <ul className="nav-list">
                        {links.map((link, index) => {
                            return (
                                <li key={index} className="nav-item">
                                    <NavLink to={link.to} className={`nav-link ${link.text == "Login" ? "auth" : ""}`}>{link.text}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
        </>)
}