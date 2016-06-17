"use strict";
import { RECEIVE_BOOK_DATA, RECEIVE_ARTICLE_INFO_DATA, RECEIVE_MENU_INFO_DATA, RECEIVE_FASHION_INFO_DATA } from '../constants/constants';

import { createReducer } from 'redux-immutablejs';
import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  bookData: {},
  articleInfoData: {},
  menuInfoData: {},
  fashionInfoData: {}
});

const actionFunc = {
  [RECEIVE_BOOK_DATA]: (state, action) => (Map({ bookData: action.data })),
  [RECEIVE_ARTICLE_INFO_DATA]: (state, action) => (Map({ articleInfoData: action.data })),
  [RECEIVE_MENU_INFO_DATA]: (state, action) => (Map({ menuInfoData: action.data })),
  [RECEIVE_FASHION_INFO_DATA]: (state, action) => (Map({ fashionInfoData: action.data }))
};
export default createReducer(initialState, actionFunc);