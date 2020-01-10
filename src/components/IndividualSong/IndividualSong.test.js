import React from 'react';
import ReactDOM from 'react-dom';
import IndividualSong from './IndividualSong';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndividualSong />, div);
  ReactDOM.unmountComponentAtNode(div);
});