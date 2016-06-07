import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';

import {createReducer} from 'redux-immutablejs';
import {Map, fromJS} from 'immutable';
import * as cookie from '../utils/cookie';

const actionFunc = {
  [LOG_IN]: (state, action) => {
    let {username} = action;
    cookie.set('username', username);
    return Map({
      username
    })
  },
  [LOG_OUT]: () => {
    cookie.remove('username');
    return Map({
      username: null
    })
  },
  [LOGGED_IN]: (state, action) => {
    let {username, tree} = action;
    return Map({
      username,
      tree
    })
  }
};

export default createReducer(Map({
  username: cookie.get('username'),
  tree: {
    "user": "",
    "fast": [],
    "menu": []
  }
}), actionFunc);