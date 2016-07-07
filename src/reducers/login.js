import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';

import {createReducer} from 'redux-immutablejs';
import {Map, fromJS} from 'immutable';
import auth from 'APIFolder/auth';

const initialState = Map({
  token: auth.getCookie('token') || null,
  userName: "",
  fast: [],
  permissions: []
});

const actionFunc = {
  [LOG_IN]: (state, action) => {
    let {userName, fast,permissions } = action.userInfo;
    return state.merge({
      token: initialState.get('token') || action.userInfo.token,
      userName,
      fast,
      permissions
    })
  },

  [LOG_OUT]: (state,action)=> initialState.set('token',null),

  [LOGGED_IN]: (state, action) => {
    let {userName, fast,permissions } = action.userInfo;
    return state.merge({
      token: auth.getCookie('token'),
      userName,
      fast,
      permissions
    })
  }
};

export default createReducer(initialState, actionFunc);