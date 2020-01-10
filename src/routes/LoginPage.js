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
    const { history } = this.props;
    const destination = '/dashboard/user';
    history.push(destination);
  }

  handleLoginFail = () => {
    const { history } = this.props;
    history.push('/loginfail');
  }

  render() {
    return (
      <Section className='LoginPage'>
        <p id="app-description">
          Build and share setlists,
          <br />
          manage repertoire,
          <br />
          collaborate with bandmates!
        </p>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          onLoginFail={this.handleLoginFail}
        />
      </Section>
    );
  }
}

export default LoginPage;