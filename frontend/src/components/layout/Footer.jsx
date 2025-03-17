import { NavLink } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCheck, faMailBulk } from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faFacebook, faTiktok, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import "../../css/footer.css"

const socials = [
    { key: 1, path: "https://www.instagram.com", icon: <FontAwesomeIcon icon={faInstagram} /> },
    { key: 2, path: "https://www.facebook.com", icon: <FontAwesomeIcon icon={faFacebook} /> },
    { key: 3, path: "https://www.tiktok.com", icon: <FontAwesomeIcon icon={faTiktok} /> },
    { key: 4, path: "https://www.twitter.com", icon: <FontAwesomeIcon icon={faXTwitter} /> },
];

export default function Footer() {
    return (
        <>
            <footer className="site-footer">
                <div className="site-info">
                    <div className="socials-container">
                        <div className="site logo">
                            <NavLink to="/">
                                <div className="logo">
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                    <p className="brand-name">TooDoo</p>
                                </div>
                            </NavLink>
                            <p className="slogan">Make your life easier with us</p>
                        </div>
                        <div className="socials">
                            {socials.map((social) => {
                                return (
                                    <NavLink to={social.path} key={social.key}>
                                        {social.icon}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                    <div className="site-links">
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <NavLink to="/privacy">Privacy</NavLink>
                    </div>
                </div>
                <div className="copyright-wrapper">
                    <p>&copy; {new Date().getFullYear()} TooDoo. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}