import React from 'react';
import ReactDOM from 'react-dom';
import {createElementWithContext} from 'fluxible-addons-react';
import app from './app';

const dehydratedState = window.App;

window.React = ReactDOM; // For chrome dev tool support

const mountNode = document.getElementById('app');

function renderApp() {
  // pass in the dehydrated server state from server.js
  app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
      throw err;
    }
    window.context = context;
    console.log('State has been rehydrated');

    ReactDOM.render(
      createElementWithContext(context),
      mountNode,
      () => console.log('Root component has been mounted')
    );
  });
}

renderApp();
