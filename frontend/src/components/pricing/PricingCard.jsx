import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"


export default function PricingCard({ props }) {
    return (
        <div className="pricing-card">
            <div className="card-header">
                <h2>{props.title}</h2>
            </div>
            <div className="benefits-wrapper">
                <ul className="benefits-list">
                    {props.benefits.map((benefit, index) => {
                        return (
                            <li key={index}><FontAwesomeIcon icon={faCheck} /> {benefit}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="prices-wrapper">
                <h3>$ {props.price} /month</h3>
                <h2>$ {props.price * 10} /year</h2>
            </div>
            <button className="btn">Get Started</button>
        </div>
    )
}