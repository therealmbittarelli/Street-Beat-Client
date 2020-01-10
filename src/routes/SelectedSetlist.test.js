import React from 'react';
import ReactDOM from 'react-dom';
import SelectedSetlist from './SelectedSetlist';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let match = {
    params: ''
  };
  let location = {
    state: {
      date: '2029-01-22T00:00:00.000Z'
    }
  };
  ReactDOM.render(<BrowserRouter>
    <SelectedSetlist match={match} location={location} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});