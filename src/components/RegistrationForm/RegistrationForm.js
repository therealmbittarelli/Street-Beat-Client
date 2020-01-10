import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';


export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegisterSuccess: () => { }
  }

  state = { error: null };

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, password } = e.target;

    this.setState({ error: null })

    AuthApiService.postUser({
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value
    })
      .then(user => {
        first_name.value = '';
        last_name.value = '';
        email.value = '';
        password.value = '';
        this.props.onRegisterSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  }

  render() {
    const { error } = this.state
    return (
      <form
        className="RegistrationForm"
        onSubmit={this.handleSubmit}
      >
        <div role="alert">
          {error && <p className="red">{'Something went wrong. Please try again.'}</p>}
        </div>
        <div className="first_name">
          <label htmlFor="RegistrationForm_first_name">
            First name <Required />
          </label>
          <Input
            name="first_name"
            type="text"
            required
            id="RegistrationForm_first_name">
          </Input>
        </div>
        <div className="last_name">
          <label htmlFor="RegistrationForm_last_name">
            Last name <Required />
          </label>
          <Input
            name="last_name"
            type="text"
            required
            id="RegistrationForm_last_name">
          </Input>
        </div>
        <div className="email">
          <label htmlFor="RegistrationForm_email">
            Email address (you'll use this to login) <Required />
          </label>
          <Input
            name="email"
            type="text"
            required
            id="RegistrationForm_email">
          </Input>
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm_password">
            Password
             <Required />
          </label>
          <p id="password-text">8 or more characters, including <br />
            at least one upper and lower case letter, <br />
            number, and special character</p>
          <Input
            name="password"
            type="password"
            required
            id="RegistrationForm_password">
          </Input>
        </div>
        <Button
          id="user-registration-submit-button"
          type="submit">
          Submit
        </Button>
      </form>
    );
  }
}
