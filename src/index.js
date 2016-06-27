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

ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
    ,document.getElementById('App')
)

