import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store, { history } from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const target = document.getElementById('root');
render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  target
);

registerServiceWorker();
