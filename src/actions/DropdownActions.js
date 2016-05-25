'use strict';
import { 
  RECEIVED_DROPDOWN_DATA,
  RECEIVED_DROPDOWN_CANTSELECT_DATA
} from '../constants/constants';

import Dropdown from '../models/Dropdown';

//选择组件数据
export const fetchDropdownData = () => {
  let data = require("../assets/MockData/dropdown_data.json");
  const json = data.map((json) => {
    return new Dropdown(json);
  })
  return dispatch => {
    dispatch(receivedDropdownData(json));
  };
};

const receivedDropdownData = (data) => {
  return {
    type: RECEIVED_DROPDOWN_DATA,
    data
  };
};

//选择组件不能选择的数据
export const fetchCantSelectData = () => {
  let data = require("../assets/MockData/dropdown_cantselect_data.json");
  const json = data.map((json) => {
    return new Dropdown(json);
  })
  return dispatch => {
    dispatch(receivedCantSelectData(json));
  };
};

const receivedCantSelectData = (data) => {
  return {
    type: RECEIVED_DROPDOWN_CANTSELECT_DATA,
    data
  };
};
