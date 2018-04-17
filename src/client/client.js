import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import State from './core/State';

const activeRoomId = parseInt(location.pathname.substr(1)) || null;
const state = new State({ activeRoomId });

ReactDOM.render(
  <App state={state} />,
  document.getElementById('app')
);
