import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from 'react-elastic-carousel'
import { firestore } from '../firebase/firebase'
import loading from '../assets/loading.gif'
import EventCard from './EventCard'
import '../styles/Dashboard.css'

const Dashboard = () => {
    const [eventCategories, setEventCategories] = useState([])
    const [hackathons, setHackathons] = useState([])
    const [techtalks, setTechtalks] = useState([])
    const [startups, setStartups] = useState([])
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
        }

        const fetchData = async () => {
            eventCategories.map(eventCategory => {
                firestore.collection(eventCategory.name).get()
                    .then(snapshot => {
                        const fetchedDataList = []
                        snapshot.docs.forEach(doc => {
                            const fetchedData = {
                                id: doc.id, ...doc.data()
                            }
                            console.log(fetchedData)
                            fetchedDataList.push(fetchedData)
                        })
                        switch (eventCategory.name) {
                            case "hackathons":
                                setHackathons(fetchedDataList)
                                break
                            case "startup-competitions":
                                setStartups(fetchedDataList)
                                break
                            case "tech-talks":
                                setTechtalks(fetchedDataList)
                                break
                            default:
                                break
                        }
                    })
                setIsFetching(false)
            })
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
                    setStartups(fetchedDataList)
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
                                            {
                                                {
                                                    'hackathons': hackathons.map(hackathons => (
                                                        <EventCard
                                                            id={hackathons.id}
                                                            onClick={() => { history.push("/" + eventCategory.name + "/" + hackathons.id) }}
                                                            poster={hackathons.poster}
                                                            alt="hackathons"
                                                            title={hackathons.title}
                                                            host={hackathons.host} />)),
                                                    'tech-talks': techtalks.map(techtalks => (
                                                        <EventCard
                                                            id={techtalks.id}
                                                            onClick={() => { history.push("/" + eventCategory.name + "/" + techtalks.id) }}
                                                            poster={techtalks.poster}
                                                            alt="techtalks"
                                                            title={techtalks.title}
                                                            host={techtalks.host} />)),
                                                    'startup-competitions': startups.map(startup => (
                                                        <EventCard
                                                            id={startup.id}
                                                            onClick={() => { history.push("/" + eventCategory.name + "/" + startup.id) }}
                                                            poster={startup.poster}
                                                            alt="startup"
                                                            title={startup.title}
                                                            host={startup.host} />))
                                                }[eventCategory.name]
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard