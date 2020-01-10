import React from 'react';
import ReactDOM from 'react-dom';
import BandRegistrationForm from './BandRegistrationForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BandRegistrationForm />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});