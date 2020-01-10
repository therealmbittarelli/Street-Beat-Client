import React from 'react';
import ReactDOM from 'react-dom';
import BandResult from './BandResult';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BandResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});