import { combineReducers } from 'redux';
import dropdown from './dropdown';
import tree from './tree';
import form from './form';
import book from './book';
import login from './login';
import article from './article';
import crowdfunding from './crowdfunding';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  tree,
  dropdown,
  form,
  book,
  routing,
  login,
  article,
  crowdfunding
});

export default rootReducer;