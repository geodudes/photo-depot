import './index.scss';
import React from 'react';
import {
  render
} from 'react-dom';
import App from './App';

import {
  Provider
} from 'react-redux';
import store from './store';
import {
  w3cwebsocket as W3CWebSocket
} from "websocket";

const client = new W3CWebSocket('ws://localhost:3000');

client.onopen = () => {
  console.log('WebSocket Client Connected');
};

render( <
  React.StrictMode >
  <
  Provider store = {
    store
  } >
  <
  App / >
  <
  /Provider> < /
  React.StrictMode > ,
  document.getElementById('root')
);
