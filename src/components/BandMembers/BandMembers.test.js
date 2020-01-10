import React from 'react';
import ReactDOM from 'react-dom';
import BandMembers from './BandMembers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BandMembers />, div);
  ReactDOM.unmountComponentAtNode(div);
});