import { combineReducers } from 'redux';
import menu from './menu';
import tree from './tree';
import dropdown from './dropdown';
import book from './book';
import form  from './form';
import editor from './editor';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  menu,
  tree,
  dropdown,
  editor,
  form,
  book,
  routing
});

export default rootReducer;