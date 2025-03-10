import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bgImage from '../../static/images/best-iphone-calendar-apps.jpg';

import '../../css/home.css';

export default function Home() {
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
                        <div className="todo-templates bento-container">
                            <div className="bento-text">
                                <div className="header">
                                    <h2>Custom templates</h2>
                                </div>
                                <div className="content">
                                    <p>Choose from a variety of templates to help you get started with your tasks.</p>
                                </div>
                            </div>
                        </div>
                        <div className="companies bento-container">
                            <div className="bento-text">
                                <div className="header">
                                    <h2>Integration with calendars</h2>
                                </div>
                                <div className="content">
                                    <p>Add your events or deadlines to your desired calendars</p>
                                </div>
                            </div>
                        </div>
                        <div className="toodoo bento-container">
                            <div className="bento-text">
                                <div className="header">
                                    <h2>What is TooDoo?</h2>
                                </div>
                                <div className="content">
                                    <p>TooDoo is a simple and easy to use task management application that helps you organize your tasks and get things done.</p>
                                </div>
                            </div>
                        </div>
                        <div className="ease-of-use bento-container">
                            <div className="bento-text">
                                <div className="header">
                                    <h2>Realtime chat</h2>
                                </div>
                                <div className="content">
                                    <p>Recieve feedback immediatly using our chat app for a task you have</p>
                                </div>
                            </div>
                        </div>
                        <div className="ui bento-container">
                            <div className="bento-background-wrapper">

                            </div>
                            <div className="bento-text">
                                <div className="header">
                                    <h2>Collaboration</h2>
                                </div>
                                <div className="content">
                                    <p>Make a list with friends for shopping or structure your projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}