'use strict';

import {
    RECEIVED_DROPDOWN_DATA,
    RECEIVED_DROPDOWN_CANTSELECT_DATA
} from '../constants/constants';

import reduceFactory from '../utils/reducerFactory';

const initialState = {
  DropdownData: [],
  CantSelectData: []
};

const actionFunc = {
  [RECEIVED_DROPDOWN_DATA]: (state, action) => ({DropdownData: action.data}),
  [RECEIVED_DROPDOWN_CANTSELECT_DATA]: (state, action) => ({CantSelectData: action.data}),
};

export default reduceFactory(initialState, actionFunc);