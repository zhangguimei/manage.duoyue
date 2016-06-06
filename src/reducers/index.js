import { combineReducers } from 'redux';
import menu from './menu';
import dropdown from './dropdown';
import tree from './tree';
import form from './form';
import book from './book';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  menu,
  tree,
  dropdown,
  form,
  book,
  routing
});

export default rootReducer;