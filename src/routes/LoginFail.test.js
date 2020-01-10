import React from 'react';
import ReactDOM from 'react-dom';
import LoginFail from './LoginFail';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
    <LoginFail />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});