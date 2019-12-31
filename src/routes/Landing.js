import React, { Component } from 'react';
import LandingPage from '../components/LandingPage/LandingPage';
import { Section } from '../components/Utils/Utils';

class Landing extends Component {

  render() {
    return (
      <Section className='LandingPage'>
        <h2>Matto is a catcatcat</h2>
        <LandingPage />
      </Section>
    )
  }
};

export default Landing;