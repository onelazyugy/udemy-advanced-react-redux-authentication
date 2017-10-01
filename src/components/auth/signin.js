import React, { Component } from "react";
import { reduxForm } from "redux-form";
import * as actions from '../../actions';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

//reduxForm has mapDispatchToProps and mapStateToProps
export default reduxForm({
  form: "signin",
  fields: ["email", "password"]
}, null, actions)(Signin);
