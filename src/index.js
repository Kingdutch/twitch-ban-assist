import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools'
import './index.css';
import './tokens.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ReactQueryDevtools />
      <App />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
