'use strict';
import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';

export const fetchTreedata = (username) => {
  let tree = "";
  switch (username) {
    case 'admin':
      tree = require("../assets/MockData/tree_data.json");
      break;
    case 'admin2':
      tree = require("../assets/MockData/tree_data2.json");
      break;
    default:
      tree = require("../assets/MockData/tree_data.json");
  }
  return dispatch => {
    return dispatch(loggedIn(username, tree));
  }
}

const loggedIn = (username, tree) => {
  return {
    type: LOGGED_IN,
    username,
    tree
  }
}

export const logIn = (username)=> {
  return {
    type: LOG_IN,
    username
  }
}

export const logOut = (username)=> {
  return {
    type: LOG_OUT,
    username
  }
}

