import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { Section } from '../components/Utils/Utils';

class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    console.log('handleLoginSuccess')
    const { history } = this.props;
    // const destination = (location.state || {}).from || '/';
    const destination = '/dashboard';
    history.push(destination);
  }

  handleLoginFail = () => {
    console.log('login failed');
    const { history } = this.props;
    history.push('/loginfail');
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          onLoginFail={this.handleLoginFail}
        />
      </Section>
    )
  }
};

export default LoginPage;