import '../styles/EventDetailCard.css'

const EventDetailCard = props => {
    return (
        <div className="event-detail-card">
            <div className="banner-container">
                <div className="poster-container">
                    <img src={props.eventPoster} alt='event' />
                </div>
                <div className="banner-text-container">
                    <div className="banner-text">
                        <div>{props.eventDate}</div>
                        <h2>{props.eventTitle}</h2>
                        <div>{props.eventHost}</div>
                    </div>
                    <button className="btn-register" onClick={props.onRegisterClick}>Register</button>
                </div>
            </div>
            <div className="detail-text-container">
                <div>{props.eventDetails}</div>
            </div>
        </div>
    )
}

export default EventDetailCard