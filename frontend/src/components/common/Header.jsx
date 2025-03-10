import '../../css/header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <>
            <header className="site-header">
                <div className="logo-wrapper">
                    <div className="logo">
                        <FontAwesomeIcon icon={faSquareCheck} />
                    </div>
                    <p className="brand-name">TooDoo</p>
                </div>

                <nav className="site-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a className="nav-link" href="">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link auth" href="">Login</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>)
}