import React from 'react';
import ReactDOM from 'react-dom';
import RegisterBand from './RegisterBand';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RegisterBand />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});