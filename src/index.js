import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/styles/global.scss';
import './lib/EventManager';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
