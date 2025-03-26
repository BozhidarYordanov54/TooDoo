import imageUrl from '../../static/images/best-iphone-calendar-apps.jpg';

export default function Card() {
    return (
        <div className="template board">
            <div className="img-wrapper">
                <img src={imageUrl} alt="template" />
            </div>
            <div className="text-wrapper">
                <h3>Template name</h3>
            </div>
        </div>
    )
}