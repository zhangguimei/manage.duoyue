import { combineReducers } from 'redux';
import menu from './menu';
import dropdown from './dropdown';
import tree from './tree';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  menu,
  tree,
  dropdown,
  routing
});

export default rootReducer;