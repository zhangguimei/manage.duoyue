import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';

import {createReducer} from 'redux-immutablejs';
import {Map, fromJS} from 'immutable';
import * as cookie from '../utils/cookie';

const initialState = Map({
  token: cookie.get('token') || null,
  permissions: [],
  tree: {
    "user": "",
    "fast": [],
    "menu": []
  }
});

const actionFunc = {
  [LOG_IN]: (state, action) => {
    return state.merge({
      token: action.token,
      userName: action.userName,
      permissions: action.permissions

    })
  },

  [LOG_OUT]: (state,action)=> initialState.set('token',null),

  [LOGGED_IN]: (state, action) => {
    let {userName, tree} = action;
    return Map({
      userName,
      tree
    })
  }
};

export default createReducer(initialState, actionFunc);