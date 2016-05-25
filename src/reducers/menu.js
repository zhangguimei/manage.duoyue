import {CHANGE_MENU_ROUTE} from '../constants/constants';

import { createReducer } from 'redux-immutablejs';
import { List } from 'immutable';

const actionFunc = {
  [CHANGE_MENU_ROUTE]: (state, action) => List(action.route)
};

export default createReducer(List(), actionFunc);