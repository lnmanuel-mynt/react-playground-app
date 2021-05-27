import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { AuthContext } from '../auth'
import firebase from '../firebase'
import logo from '../logo.svg'
import Modal from './Modal'
import './Navbar.css'

const defaultStates = {
    email: '',
    password: '',
    displayName: '',
    showModal: false,
    isNewUser: false,
}

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const history = useHistory();

    const [email, setEmail] = useState(defaultStates.email)
    const [password, setPassword] = useState(defaultStates.password)
    const [displayName, setDisplayName] = useState(defaultStates.displayName)
    const [isNewUser, setIsNewUser] = useState(defaultStates.isNewUser)
    const [showModal, setShowModal] = useState(defaultStates.showModal)

    const resetInputFields = () => {
        setEmail(defaultStates.email)
        setPassword(defaultStates.password)
        setDisplayName(defaultStates.displayName)
    }

    const resetToggles = () => {
        setShowModal(defaultStates.showModal)
        setIsNewUser(defaultStates.isNewUser)
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const toggleIsNewUser = () => {
        setIsNewUser(!isNewUser)
    }

    const login = async event => {
        event.preventDefault()
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            resetInputFields()
            setShowModal(!showModal)
        } catch {
            window.alert('Failed to log in!')
        }
    }

    const register = async event => {
        event.preventDefault()
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            await firebase.auth().currentUser.updateProfile({ displayName })
            resetInputFields()
            window.alert('You are now registered and logged in!')
        } catch {
            window.alert('Failed to register!')
        }
    }

    const logout = async () => {
        try {
            await firebase.auth().signOut()
        } catch {
            window.alert('Failed to log out!')
        }
    }

    const handleInputChange = (event, setState) => {
        event.preventDefault()
        setState(event.target.value)
    }

    return (
        <>
            {!!currentUser ? (
                <div className="pinning-header-container">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav-brand">
                        Playground
                        </div>
                    <div className="nav-button">
                        <button
                            className="host-item"
                            onClick={() => {
                                history.push("/host-an-event")
                            }}>
                            Host an Event
                                </button>
                        <button className="login-item" onClick={logout}>Logout</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="pinning-header-container">
                        <div className="nav-brand">
                            Playground
                        </div>
                        <div className="nav-button">
                            <button className="host-item" onClick={() => {
                                history.push("/host-an-event")
                            }}>
                                Host an Event
                                </button>
                            <button className="login-item" onClick={toggleModal}>Login</button>
                        </div>
                    </div>
                    <Modal
                        showModal={showModal}
                        closeModal={resetToggles}
                        toggleShowModal={toggleModal}
                        isNewUser={isNewUser}
                        toggleIsNewUser={toggleIsNewUser}
                        onLoginFormSubmit={login}
                        onSignupFormSubmit={register}
                        valueDisplayName={displayName}
                        onDisplayNameChange={event => handleInputChange(event, setDisplayName)}
                        valueEmail={email}
                        onEmailChange={event => handleInputChange(event, setEmail)}
                        valuePassword={password}
                        onPasswordChange={event => handleInputChange(event, setPassword)}
                        onLoginClick={toggleIsNewUser}
                        onSignupClick={toggleIsNewUser} />
                </>
            )
            }
        </>
    )
}

export default Navbar