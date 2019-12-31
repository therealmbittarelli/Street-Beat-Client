import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginFail.css';

class LoginFail extends Component {

  render() {
    return (
      <div id="login-main">
        <h2>Login failed. What would you like to do?</h2>
        <div id="signin">
          <Link to={'/'}>Sign in</Link>
        </div>
        <div id="register">
          <Link to={'/register'}>Register</Link>
        </div>
      </div>
    )
  }
}

export default LoginFail;