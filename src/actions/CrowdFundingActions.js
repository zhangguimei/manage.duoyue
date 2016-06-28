"use strict";
import {RECEIVE_CROWDFUNDING_LIST} from '../constants/constants';
import {RECEIVE_CROWDFUNDING_DETAIL} from '../constants/constants';

import CrowdFunding from '../models/CrowdFunding';
import CrowdFundingDetail from '../models/CrowdFundingDetail';

export const fetchCrowdFundingList = () => {
  let data = require('AssetsFolder/MockData/sourcecenter/crowdfunding/crowdfunding_list_data.json');
  let dataList = data.map((item) => {
    return new CrowdFunding(item);
  });
  return (dispatch)=>dispatch(receiveCrowdFundingList(dataList));
};

const receiveCrowdFundingList = (data) => {
  return {
    type: RECEIVE_CROWDFUNDING_LIST,
    data
  };
};

export const fetchCrowdFundingDetail = (id) => {
  let originData = require('AssetsFolder/MockData/sourcecenter/crowdfunding/crowdfunding_detail_data.json');
  let data = originData.filter(data => data.id == id)[0];
  return (dispatch) => dispatch(receiveCrowdFundingDetail(new CrowdFundingDetail(data)));
};

const receiveCrowdFundingDetail = (data) => {
  return {
    type: RECEIVE_CROWDFUNDING_DETAIL,
    data
  };
};