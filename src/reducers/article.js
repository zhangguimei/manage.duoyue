"use strict";
import {
  RECEIVE_ARTICLE_DATA,
  RECEIVE_ACCOUNT_DATA,
  RECEIVE_RESOURCE_DATA,
  RECEIVE_TAGS_ARR_DATA
} from '../constants/constants';
import { createReducer } from 'redux-immutablejs';
import { Map, fromJS } from 'immutable';


const initialState = fromJS({
  articleData: {},
  accountData: {},
  resourceData: {},
  tagsArrData: {}
});

const actionFunc = {
  [RECEIVE_ARTICLE_DATA]: (state, action) => (Map({articleData: action.data})),
  [RECEIVE_ACCOUNT_DATA]: (state, action) => (Map({accountData: action.data})),
  [RECEIVE_RESOURCE_DATA]: (state, action) => (Map({resourceData: action.data})),
  [RECEIVE_TAGS_ARR_DATA]: (state, action) => (Map({tagsArrData: action.data}))
};

export default createReducer(initialState, actionFunc);