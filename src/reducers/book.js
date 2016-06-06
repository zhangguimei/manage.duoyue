"use strict";
import { RECEIVE_BOOK_DATA } from '../constants/constants';

import { createReducer } from 'redux-immutablejs';
import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  bookData: {}
});

const actionFunc = {
  [RECEIVE_BOOK_DATA]: (state, action) => (Map({ bookData: action.data }))
};

export default createReducer(initialState, actionFunc);