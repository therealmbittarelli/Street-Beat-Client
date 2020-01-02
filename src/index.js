import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { BandsListProvider } from './Context';

ReactDOM.render(
  <BrowserRouter>
    <BandsListProvider>
      <App />
    </BandsListProvider>
  </BrowserRouter>, document.getElementById('root'));

