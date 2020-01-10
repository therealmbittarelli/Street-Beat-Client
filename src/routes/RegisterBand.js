import React, { Component } from 'react';
import BandRegistrationForm from '../components/BandRegistrationForm/BandRegistrationForm';
import { Section } from '../components/Utils/Utils';
import './RegisterBand.css';

class RegisterBand extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleRegisterSuccess = () => {
    const { history } = this.props;
    history.push('/dashboard/user');
  }

  render() {
    return (
      <Section className="RegisterBand">
        <h2>Add a band</h2>
        <BandRegistrationForm
          onRegistrationSuccess={this.handleRegisterSuccess}
        />
      </Section>
    );
  }
}

export default RegisterBand;