import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import State from './core/State';
import Socket from './core/Socket';

import './master.less';
import 'semantic-ui-css/semantic.min.css';

const activeRoomId = parseInt(location.pathname.substr(1)) || null;
const state = new State({ activeRoomId });
const socket = new Socket({ state });

ReactDOM.render(
  <App state={state} socket={socket} />,
  document.getElementById('app')
);
