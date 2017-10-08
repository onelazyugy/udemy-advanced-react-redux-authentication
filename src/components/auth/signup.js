import React, { Component } from "react";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    } = this.props;
    return (
        <form> 
            <fieldset className="form-group">
                <label>Email:</label>
                <input className="form-control" {...email}/>
            </fieldset>
            <fieldset className="form-group">
                <label>Password:</label>
                <input className="form-control" type="password" {...password}/>
                {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset>
            <fieldset className="form-group">
                <label>Confirm Password:</label>
                <input className="form-control" type="password" {...passwordConfirm}/>
            </fieldset>
            <button action="submit" className="btn btn-primary">Sign up!</button>
        </form>
    );
  }
}

function validate(formProps) {
    const errors = {};
    console.log(formProps);
    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwrod must match';
    }
    return errors;
}

export default reduxForm({
  form: "signup",
  fields: ["email", "password", "passwordConfirm"],
  validate
})(Signup);
