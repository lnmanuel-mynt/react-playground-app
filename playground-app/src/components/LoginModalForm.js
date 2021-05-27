import './Form.css'

const LoginModalForm = props => {
    return (
        <>
            <form className="form" onSubmit={props.onFormSubmit}>
                <div className="form-body">
                    <header className="form-control">Login</header>
                    <div className="form-control">
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
                        <button className="btn-submit" type="submit">Login</button>
                    </div>
                    <div className="form-footer" onClick={props.onSignupClick}>
                        Don't have an account? Sign up
                        </div>
                </div>
            </form>
        </>
    )
}

export default LoginModalForm