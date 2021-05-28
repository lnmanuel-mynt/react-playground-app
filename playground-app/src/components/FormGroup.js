const FormGroup = props => {
    return (
        <div className="form-group">
            <div>
                <label htmlFor={props.htmlFor}>{props.labelText}</label>
            </div>
            <div>
                <input required type={props.inputType} value={props.inputValue} onChange={props.onInputChange}></input>
            </div>
        </div>
    )
}

export default FormGroup