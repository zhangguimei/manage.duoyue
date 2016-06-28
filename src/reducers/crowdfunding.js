"use strict";
import {RECEIVE_CROWDFUNDING_LIST} from '../constants/constants';
import {RECEIVE_CROWDFUNDING_DETAIL} from '../constants/constants';

import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

const initialState = fromJS({
  crowdFundingList: [],
  crowdFundingDetail: {}
});

const actionFunc = {
  [RECEIVE_CROWDFUNDING_LIST]: (state, action) => (state.set("crowdFundingList", action.data)),
  [RECEIVE_CROWDFUNDING_DETAIL]: (state, action) => (state.set("crowdFundingDetail", action.data))
};

export default createReducer(initialState, actionFunc);