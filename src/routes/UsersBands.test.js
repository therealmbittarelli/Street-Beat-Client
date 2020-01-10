import React from 'react';
import ReactDOM from 'react-dom';
import UsersBands from './UsersBands';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
    <UsersBands />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});