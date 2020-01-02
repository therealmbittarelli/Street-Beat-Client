import React, { Component } from 'react';
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

  handleSubmitBasicAuth(ev) {
    ev.preventDefault();
    const { email, password } = ev.target;

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(email.value, password.value)
    );

    email.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  }

  handleSubmitJwtAuth(ev) {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = ev.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value
    })
      .then((res) => {
        email.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.context.activeUser = res.id;
        console.log('res.id is', res.id);
        this.props.onLoginSuccess();
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
        onSubmit={(ev) => { this.handleSubmitJwtAuth(ev); }}
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
        <Button type='submit'>
          Login
        </Button>
        {/* <Link>
          <p>Register here</p>
        </Link> */}
      </form>
    );
  }
}
