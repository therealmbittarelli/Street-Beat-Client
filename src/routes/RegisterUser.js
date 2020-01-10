import React, { Component } from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { Section } from '../components/Utils/Utils';

class RegisterUser extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleRegisterSuccess = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <Section className="RegisterUser">
        <h2>Register</h2>
        <RegistrationForm
          onRegisterSuccess={() => this.handleRegisterSuccess()}
        />
      </Section>
    );
  }
}

export default RegisterUser;