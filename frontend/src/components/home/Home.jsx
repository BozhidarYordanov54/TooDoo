
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardVideos from './CardVideos';

import '../../css/home.css';

export default function Home() {
    const bentoGridObj = [
        {
            mainClassname: "todo-templates",
            header: "Custom templates",
            content: "Choose from a variety of templates to help you get started with your tasks."
        },
        {
            mainClassname: "companies",
            header: "Integration with calendars",
            content: "Add your events or deadlines to your desired calendars"
        },
        {
            mainClassname: "toodoo",
            header: "What is TooDoo?",
            content: "TooDoo is a simple and easy to use task management application that helps you organize your tasks and get things done."
        },
        {
            mainClassname: "ease-of-use",
            header: "Realtime chat",
            content: "Recieve feedback immediatly using our chat app for a task you have"
        },
        {
            mainClassname: "ui",
            header: "Collaboration",
            content: "Make a list with friends for shopping or structure your projects"
        },
    ];

    return (
        <>
            <div className="home-container">
                <div className="home-wrapper">
                    <div className="home-content">
                        <h1 className="home-title">Welcome to <span className="brand-name">TooDoo,</span></h1>
                        <div className="intro-wrapper">
                            <div className="text-wrapper">
                                <h3 className="home-text">Justify your time, by managing your day</h3>
                            </div>
                            <p className="home-description">TooDoo is a simple and easy to use task management application that helps you organize your tasks and get things done.</p>
                        </div>
                        <div className="cta-wrapper">
                            <a href="/login" className="cta-login">Join For Free</a>
                            <a href="/pricing" className='cta-pricing'>See our plans <FontAwesomeIcon className='arrow' icon={faArrowRight}></FontAwesomeIcon></a>
                        </div>
                    </div>
                </div>
                <section className="bento-grid-container">
                    <h2 className="section-header">Features.</h2>
                    <div className="container">
                        {
                            bentoGridObj.map((obj, index) => {
                                return (
                                    <div className={`bento-container ${obj.mainClassname}`} key={index}>
                                        <div className="bento-text">
                                            <div className="header">
                                                <h2>{obj.header}</h2>
                                            </div>
                                            <div className="content">
                                                <p>{obj.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}