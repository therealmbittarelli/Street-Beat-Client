import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import { Button, Input } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import BandsListContext from '../../Context';
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { },
    onLoginFail: () => { }
  };

  static contextType = BandsListContext;

  state = { error: null };

  handleSubmitJwtAuth(e) {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;
    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then((res) => {
        email.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
        this.context.setLoggedIn(true);
      })
      .catch((res) => {
        this.setState({ error: res.error });
        this.props.onLoginFail();
      });
  }

  render() {
    const { error } = this.state;
    return (
      <form
        className='LoginForm'
        onSubmit={(e) => { this.handleSubmitJwtAuth(e); }}
      >
        <div role='alert'>
          {error && <p className='red'>{'Something went wrong. Please try again.'}</p>}
        </div>
        <div className='email'>
          <label htmlFor='LoginForm_email'>
            User name
          </label>
          <Input
            required
            name='email'
            id='LoginForm_email'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm_password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm_password'>
          </Input>
        </div>
        <Button
          id="login-submit-button"
          type='submit'>
          Login
        </Button>
        <Link
          to='/register'
          id="login-register-button">
          Register</Link>
      </form>
    );
  }
}
