import '../../css/floating-cards.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRootVariable, faLanguage, faEarthEurope, faDna, faFlaskVial, faCode, faAtom, faMusic, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function FloatingCards() {

    const statistics = [
        "Your daily routine",
        "Learning progress",
        "Your goals",
        "Your achievements",
    ];

    return (
        <>
            <section className="exploding-elements-wrapper">
                <div className="background-text-wrapper">
                    <h2>Keep track of</h2>
                    <div className="scrollable-text">
                        {
                            statistics.map((statistic, index) => (
                                <div key={index} className="statistic">
                                    <span>{statistic} </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="subjects-wrapper">
                    <div className="icon-row one">
                        <div className="subject"><FontAwesomeIcon className='icon coding' icon={faCode} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon math' icon={faSquareRootVariable} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon languages' icon={faLanguage} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon geography' icon={faEarthEurope} /></div>
                    </div>
                    <div className="icon-row two">
                        <div className="subject"><FontAwesomeIcon className='icon biology' icon={faDna} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon chemistry' icon={faFlaskVial} /></div>
                    </div>
                    <div className="icon-row three">
                        <div className="subject"><FontAwesomeIcon className='icon physics' icon={faAtom} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon music' icon={faMusic} /></div>
                        <div className="subject"><FontAwesomeIcon className='icon art' icon={faPalette} /></div>
                    </div>
                </div>
            </section>
        </>
    )
}