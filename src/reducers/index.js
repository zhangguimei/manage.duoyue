import { combineReducers } from 'redux';
import menu from './menu';
import dropdown from './dropdown';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  menu,
  dropdown,
  routing
});

export default rootReducer;