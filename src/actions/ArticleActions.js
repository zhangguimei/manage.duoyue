"use strict";
import {
  RECEIVE_ARTICLE_DATA,
  RECEIVE_ACCOUNT_DATA,
  RECEIVE_RESOURCE_DATA,
  RECEIVE_TAGS_ARR_DATA
} from '../constants/constants';
import Tag from '../models/tag';

export const fetchArticleData = (id) => {
  let data = require("../assets/MockData/sourcecenter/source_center_data.json");
  let json = data.filter(data => data.id == id);
  return (dispatch) => dispatch(receiveArticleData(json[0]));
};

const receiveArticleData = (data) => {
  return {
    type: RECEIVE_ARTICLE_DATA,
    data: data
  };
};

//tags
export const fetchTagsArrData = () => {
  let data = require('../assets/MockData/sourcecenter/article_tags_data.json');
  return dispatch => {
    let arrData = data.map((item) => {
      return new Tag(item);
    });
    return dispatch(receiveTagsArrData(arrData));
  }
};

const receiveTagsArrData = (data) => {
  return {
    type: RECEIVE_TAGS_ARR_DATA,
    data: data
  }
};

export const receiveAccountData = (data) => {
  return {
    type: RECEIVE_ACCOUNT_DATA,
    data: data
  };
};

export const fetchResourceData = (type) => {
  let data = require('../assets/MockData/sourcecenter/source_item_data.json');
  let json = data[type];
  return (dispatch) => dispatch(receiveResourceData(json));
};

const receiveResourceData = (data) => {
  return {
    type: RECEIVE_RESOURCE_DATA,
    data
  };
};