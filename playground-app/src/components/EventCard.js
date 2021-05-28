import '../styles/EventCard.css'

const EventCard = props => {
    return (
        <div className="card" key={props.id} onClick={props.onClick}>
            <img src={props.poster} alt={props.alt} />
            <div className="title">
                {props.title}
            </div>
            <div>
                {props.host}
            </div>
        </div>
    )
}

export default EventCard
