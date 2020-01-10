import React from 'react';
import ReactDOM from 'react-dom';
import BandSearch from './BandSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BandSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});