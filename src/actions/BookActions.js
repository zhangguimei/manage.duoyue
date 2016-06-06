"use strict";
import { RECEIVE_BOOK_DATA } from '../constants/constants';

export const fetchBookData = (id) => {
  let data = require("../assets/MockData/book/book_info.json");
  return (dispatch) => dispatch(receiveBookData(data));
};

const receiveBookData = (data) => {
  return {
    type: RECEIVE_BOOK_DATA,
    data: data
  };
};