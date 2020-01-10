import React from 'react';
import ReactDOM from 'react-dom';
import ShuttleBox from './ShuttleBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShuttleBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});