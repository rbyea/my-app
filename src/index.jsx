import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

const rootСheck = document.getElementById('root')

if (rootСheck) {
  const root = ReactDOM.createRoot(rootСheck);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}

