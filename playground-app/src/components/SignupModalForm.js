import FormGroup from './FormGroup'
import '../styles/Form.css'

const SignupModalForm = props => {
    return (
        <form className="form" onSubmit={props.onFormSubmit}>
            <div className="form-body" >
                <header className="form-control">Sign Up</header>
                <div className="form-control">
                    <FormGroup
                        htmlFor="displayName"
                        labelText="Display Name"
                        inputType="text"
                        inputValue={props.displayNameValue}
                        onInputChange={props.onDisplayNameChange} />
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
                    <button className="btn-submit" type="submit">Sign Up</button>
                </div>
                <div className="form-footer" onClick={props.onLoginClick}>
                    Have an account? Login
                </div>
            </div>
        </form>
    )
}

export default SignupModalForm