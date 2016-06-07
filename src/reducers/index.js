import { combineReducers } from 'redux';
import menu from './menu';
import dropdown from './dropdown';
import tree from './tree';
import form from './form';
import book from './book';
import login from './login';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  menu,
  tree,
  dropdown,
  form,
  book,
  routing,
  form: formReducer,
  login
});

export default rootReducer;