import './Form.css'

const SignupModalForm = props => {
    return (
        <>
            <form className="form" onSubmit={props.onFormSubmit}>
                <div className="form-body" >
                    <header className="form-control">Sign Up</header>
                    <div className="form-control">
                        <div className="form-group">
                            <div>
                                <label htmlFor="displayName">Display Name</label>
                            </div>
                            <div>
                                <input required type="text" value={props.displayNameValue} onChange={props.onDisplayNameChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div>
                                <input required type="text" value={props.emailValue} onChange={props.onEmailChange}></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <label htmlFor="password">Password</label>
                            </div>
                            <div>
                                <input required type="password" value={props.passwordValue} onChange={props.onPasswordChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <button className="btn-submit" type="submit">Sign Up</button>
                    </div>
                    <div className="form-footer" onClick={props.onLoginClick}>
                        Have an account? Login
                        </div>
                </div>
            </form>
        </>
    )
}

export default SignupModalForm