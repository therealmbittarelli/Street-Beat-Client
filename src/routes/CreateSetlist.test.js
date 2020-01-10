import React from 'react';
import ReactDOM from 'react-dom';
import CreateSetlist from './CreateSetlist';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  let match = {
    params: ''
  };
  ReactDOM.render(<BrowserRouter>
    <CreateSetlist match={match} />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});