import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import { AuthContext } from '../auth';
import { firestore } from '../firebase';
import loading from '../loading.gif'
import './EventDetails.css'

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
                    } else {
                        console.log("No such document!")
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error)
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
        <>
            <div className="event-container">
                {isFetching ? <img src={loading} alt="loading" /> : (
                    <div className="detail-container">
                        <div className="banner-container">
                            <div className="poster-container">
                                <img src={eventDetails.poster} alt='event' />
                            </div>
                            <div className="banner-text-container">
                                <div className="banner-text">
                                    <div>
                                        <div>{new Date(eventDetails.date.seconds * 1000).toLocaleDateString("en-US")}</div>
                                        <h2>{eventDetails.title}</h2>
                                        <div>{eventDetails.host}</div>
                                    </div>
                                </div>
                                <button className="btn-register" onClick={register}>Register</button>
                            </div>
                        </div>
                        <div className="detail-text-container">
                            <div>
                                {eventDetails.details}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default EventDetails