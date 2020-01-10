import React from 'react';
import ReactDOM from 'react-dom';
import AllSongs from './AllSongs';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let match = {
    params: ''
  };
  ReactDOM.render(<BrowserRouter>
    <AllSongs match={match} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});