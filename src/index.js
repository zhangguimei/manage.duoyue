'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import configureStore from './store/configureStore';
import routes from './routes';

let state = window.__initialState__ || {};
const createHistory = process.env.NODE_ENV !== 'production' ? createBrowserHistory : createHashHistory;
const store = configureStore(browserHistory, state);
const createScrollHistory = useScroll(createHistory);
const appHistory = useRouterHistory(createScrollHistory)();
const history = syncHistoryWithStore(appHistory, store);

const rootRoute = {
  component: 'div',
  indexRoute:  require('./routes/ManagePage'),
  childRoutes: [ {
    path: '/',
    component: require('./components/App'),
    childRoutes: [
      require('./routes/LoginPage'),
      require('./routes/RegisterPage'),
      require('./routes/ManagePage')
    ]
  } ]
}
ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={rootRoute}/>
    </Provider>
    ,document.getElementById('App')
)

