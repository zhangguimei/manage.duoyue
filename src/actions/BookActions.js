"use strict";
import { RECEIVE_BOOK_DATA, RECEIVE_ARTICLE_INFO_DATA, RECEIVE_MENU_INFO_DATA, RECEIVE_FASHION_INFO_DATA } from '../constants/constants';

export const fetchBookData = (id) => {
  let data = require("../assets/MockData/sourcecenter/book/book_info.json");
  return (dispatch) => dispatch(receiveBookData(data));
};

const receiveBookData = (data) => {
  return {
    type: RECEIVE_BOOK_DATA,
    data: data
  };
};

export const fetchArticleInfoData = (id) => {
  let data = require("../assets/MockData/sourcecenter/book/book_article_table_data.json").tableContentData;
  let json = data.filter(item => item.id == id);
  return (dispatch) => dispatch(receiveArticleInfoData(json[0]));
};

const receiveArticleInfoData = (data) => {
  return {
    type: RECEIVE_ARTICLE_INFO_DATA,
    data: data
  };
};

const receiveMenuInfoData = (data) => {
  return {
    type: RECEIVE_MENU_INFO_DATA,
    data: data
  };
};

export const fetchMenuInfoData = (data) => {
  return (dispatch) => dispatch(receiveMenuInfoData(data));
};

export const fetchFashionInfoData = (id) => {
  let data = require("../assets/MockData/sourcecenter/book/book_fashion_table_data.json").tableContentData;
  let json = data.filter(item => item.id == id);
  console.log(json)
  return (dispatch) => dispatch(receiveFashionInfoData(json[0]));
};

const receiveFashionInfoData = (data) => {
  console.log("act",data)
  return {
    type: RECEIVE_FASHION_INFO_DATA,
    data: data
  };
};



