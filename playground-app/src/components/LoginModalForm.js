import FormGroup from './FormGroup'
import '../styles/Form.css'

const LoginModalForm = props => {
    return (
        <form className="form" onSubmit={props.onFormSubmit}>
            <div className="form-body">
                <header className="form-control">Login</header>
                <div className="form-control">
                    <FormGroup
                        htmlFor="email"
                        labelText="Email"
                        inputType="text"
                        inputValue={props.emailValue}
                        onInputChange={props.onEmailChange} />
                    <FormGroup
                        htmlFor="password"
                        labelText="Password"
                        inputType="password"
                        inputValue={props.passwordValue}
                        onInputChange={props.onPasswordChange} />
                </div>
                <div className="form-control">
                    <button className="btn-submit" type="submit">Login</button>
                </div>
                <div className="form-footer" onClick={props.onSignupClick}>
                    Don't have an account? Sign up
                    </div>
            </div>
        </form>
    )
}

export default LoginModalForm