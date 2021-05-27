import React, { useEffect, useRef, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { MdClose } from 'react-icons/md'
import LoginModalForm from './LoginModalForm'
import SignupModalForm from './SignupModalForm'
import fun from './fun.jpg'
import './Modal.css'

const Modal = props => {
    const modalRef = useRef()

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: props.showModal ? 1 : 0,
        transform: props.showModal ? 'translateY(0%)' : 'translateY(-100%)'
    })

    const closeModal = e => {
        if (modalRef.current === e.target) {
            props.closeModal()
        }
    }

    const keyPress = useCallback(e => {
        if (e.key === 'Escape' && props.showModal) {
            props.closeModal()
        }
    }, [props.toggleShowModal, props.showModal]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    return (
        <>
            {props.showModal ? (
                <>
                    {props.isNewUser ? (
                        <div className="background" ref={modalRef} onClick={closeModal}>
                            <animated.div style={animation}>
                                <div className="modal-wrapper">
                                    <MdClose className="button-modal-close" onClick={() => props.closeModal()} />
                                    <div className="modal-content">
                                        <SignupModalForm
                                            onFormSubmit={props.onSignupFormSubmit}
                                            displayName={props.displayNameValue}
                                            onDisplayNameChange={props.onDisplayNameChange}
                                            emailValue={props.emailValue}
                                            onEmailChange={props.onEmailChange}
                                            passwordValue={props.passwordValue}
                                            onPasswordChange={props.onPasswordChange}
                                            onLoginClick={props.onLoginClick} />
                                    </div>
                                    <img src={fun} alt="fun"></img>
                                </div>
                            </animated.div>
                        </div>
                    ) : (
                        <div className="background" ref={modalRef} onClick={closeModal}>
                            <animated.div style={animation}>
                                <div className="modal-wrapper">
                                    <MdClose className="button-modal-close" onClick={() => props.closeModal()} />
                                    <div className="modal-content">
                                        <LoginModalForm
                                            onFormSubmit={props.onLoginFormSubmit}
                                            emailValue={props.emailValue}
                                            onEmailChange={props.onEmailChange}
                                            passwordValue={props.passwordValue}
                                            onPasswordChange={props.onPasswordChange}
                                            onSignupClick={props.onSignupClick} />
                                    </div>
                                    <img src={fun} alt="fun"></img>
                                </div>
                            </animated.div>
                        </div>
                    )}
                </>) : null
            }
        </>
    )
}

export default Modal