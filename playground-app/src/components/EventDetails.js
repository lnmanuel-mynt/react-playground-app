import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../firebase/auth'
import { firestore } from '../firebase/firebase'
import loading from '../assets/loading.gif'
import EventDetailCard from './EventDetailCard'
import '../styles/EventDetails.css'

const EventDetails = () => {
    const { category, id } = useParams()
    const [eventDetails, setEventDetails] = useState({})
    const [isFetching, setIsFetching] = useState(true)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchEventDetails = async () => {
            await firestore.collection(category).doc(id).get()
                .then((doc) => {
                    if (doc.exists) {
                        console.log("Document data: ", doc.data())
                        setEventDetails(doc.data())
                        return
                    } else {
                        console.log("No such document!")
                        return
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error)
                    return
                })
            setIsFetching(false)
        }

        fetchEventDetails()
    }, [])

    const register = () => {
        if (!!currentUser) {
            alert("You have registered to the event.")
            return
        }
        alert("Please login to register.")
        return
    }

    return (
        <div className="event-container">
            {isFetching ? <img src={loading} alt="loading" /> : (
                <EventDetailCard
                    eventPoster={eventDetails.poster}
                    eventDate={new Date(eventDetails.date.seconds * 1000).toLocaleDateString("en-US")}
                    eventTitle={eventDetails.title}
                    eventHost={eventDetails.host}
                    eventDetails={eventDetails.details}
                    onRegisterClick={register} />
            )}
        </div>
    )
}

export default EventDetails