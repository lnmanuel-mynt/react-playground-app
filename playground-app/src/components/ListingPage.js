import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Carousel from 'react-elastic-carousel'
import { firestore } from '../firebase'
import loading from '../loading.gif'
import './ListingPage.css'
import Item from '../Item'

const ListingPage = props => {
    const [eventCategories, setEventCategories] = useState([])
    const [hackathons, setHackathons] = useState([])
    const [techtalks, setTechtalks] = useState([])
    const [startup, setStartup] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    const history = useHistory()

    useEffect(() => {
        const fetchEventCategories = async () => {
            await firestore.collection('event-categories').get()
                .then(snapshot => {
                    const fetchedDataList = []
                    snapshot.docs.forEach(doc => {
                        const fetchedData = {
                            id: doc.id, ...doc.data()
                        }
                        console.log(fetchedData)
                        fetchedDataList.push(fetchedData)
                    })
                    setEventCategories(fetchedDataList)
                })
            setIsFetching(false)
        }

        const fetchHackathons = async () => {
            await firestore.collection('hackathons')
                .orderBy("date", "asc")
                .get()
                .then(response => {
                    const fetchedDataList = []
                    response.docs.forEach(doc => {
                        const fetchedData = {
                            id: doc.id, ...doc.data()
                        }
                        fetchedDataList.push(fetchedData)
                    })
                    setHackathons(fetchedDataList)
                })
            setIsFetching(false)
        }

        const fetchStartup = async () => {
            await firestore.collection('startup-competitions')
                .orderBy("date", "asc")
                .get()
                .then(response => {
                    const fetchedDataList = []
                    response.docs.forEach(doc => {
                        const fetchedData = {
                            id: doc.id, ...doc.data()
                        }
                        fetchedDataList.push(fetchedData)
                    })
                    setStartup(fetchedDataList)
                })
            setIsFetching(false)
        }

        const fetchTechTalks = async () => {
            await firestore.collection('tech-talks')
                .orderBy("date", "asc")
                .get()
                .then(response => {
                    const fetchedDataList = []
                    response.docs.forEach(doc => {
                        const fetchedData = {
                            id: doc.id, ...doc.data()
                        }
                        fetchedDataList.push(fetchedData)
                    })
                    setTechtalks(fetchedDataList)
                })
            setIsFetching(false)
        }

        fetchEventCategories()
        fetchHackathons()
        fetchStartup()
        fetchTechTalks()
    }, [])

    return (
        <div className="landing-container">
            <div className="content-container">
                <div className="listing-container">
                    {isFetching ? <img src={loading} alt="loading" /> : (
                        <div className="category-container">
                            {eventCategories.map(eventCategory => (
                                <div className="card-row-header" key={eventCategory.id}>
                                    {eventCategory.name}
                                    <div className="card-row">
                                        <Carousel itemsToShow={3}>
                                            {eventCategory.name === "hackathons" && hackathons.map(hackathons => (
                                                <Item>
                                                    <div
                                                        className="card"
                                                        key={hackathons.id}
                                                        onClick={() => {
                                                            history.push("/" + eventCategory.name + "/" + hackathons.id)
                                                        }}>
                                                        <img src={hackathons.poster} alt="hackathon" />
                                                        <div className="title">
                                                            {hackathons.title}
                                                        </div>
                                                        <div>
                                                            {hackathons.host}
                                                        </div>
                                                    </div>
                                                </Item>
                                            ))}
                                            {eventCategory.name === "tech-talks" && techtalks.map(techtalks => (
                                                <Item>
                                                    <div
                                                        className="card"
                                                        key={techtalks.id}
                                                        onClick={() => {
                                                            history.push("/" + eventCategory.name + "/" + techtalks.id)
                                                        }}>
                                                        <img src={techtalks.poster} alt="techtalks" />
                                                        <div className="title">
                                                            {techtalks.title}
                                                        </div>
                                                        <div>
                                                            {techtalks.host}
                                                        </div>
                                                    </div>
                                                </Item>
                                            ))}
                                            {eventCategory.name === "startup-competitions" && startup.map(startup => (
                                                <Item>
                                                    <div
                                                        className="card"
                                                        key={startup.id}
                                                        onClick={() => {
                                                            history.push("/" + eventCategory.name + "/" + startup.id)
                                                        }}>
                                                        <img src={startup.poster} alt="startup" />
                                                        <div className="title">
                                                            {startup.title}
                                                        </div>
                                                        <div>
                                                            {startup.host}
                                                        </div>
                                                    </div>
                                                </Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListingPage