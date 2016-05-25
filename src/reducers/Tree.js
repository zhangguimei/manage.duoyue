import {CHOOSED_TREE_LEAVES} from '../constants/constants';

import { createReducer } from 'redux-immutablejs';
import { List } from 'immutable';

const actionFunc = {
  [CHOOSED_TREE_LEAVES]: (state, action) => {
    let id = action.id, route;
    if(id instanceof Array && id.length > 1) {
      if(action.allchoose) {
        route = state.concat(id);
      } else {
        route = state.filter(item => {
          return id.findIndex( v => v == item) < 0
        })
      }
      return route;
    } else {
      route = state.filter(v => v == id).size > 0 ?
        state.filter( v => v != id) :
        state.concat([id]);
      return route;
    }
  }
};

export default createReducer(List(), actionFunc);