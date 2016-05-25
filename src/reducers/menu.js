import {CHANGE_MENU_ROUTE, CHOOSED_TREE_LEAVES} from '../constants/constants';
import reduceFactory from '../utils/reducerFactory';

const initialState = [];

const actionFunc = {
  [CHANGE_MENU_ROUTE]: (state, action) => (action.route),
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
      route = state.filter(v => v == id).length > 0 ?
              state.filter( v => v != id) :
              state.concat([id]);
      return route;
    }
  }
};


export default reduceFactory(initialState, actionFunc);