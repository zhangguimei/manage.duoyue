'use strict';
import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';
import auth from '../api/auth';
import { getBookType } from '../api/axiosServices';

export const fetchTreedata = (username) => {
  //getBookType();
  let tree = "";
  switch (username) {

    case 'admin':
      tree = require("../assets/MockData/tree_data.json");
        //console.log(tree.menu);

      const dataMap = tree.menu.reduce(function (map, category) {
        category.itemsMap = category.data.reduce(function (itemsMap, item) {
          item.itemsMap = item.data.reduce(function(jMap, j) {
            j.itemsMap = j.data.reduce(function(kMap, k){
              kMap[k.name] = k;
              return kMap;
            }, {});
            jMap[j.name] = j;
            return jMap;
          }, {});
          itemsMap[item.name] = item;
          return itemsMap;
        }, {});
        map[category.name] = category;
        return map;
      }, {});

      //console.log("susan" ,dataMap);

      break;
    case 'admin2':
      tree = require("../assets/MockData/tree_data2.json");
      break;
    default:
      tree = require("../assets/MockData/tree_data.json");
  }
  //console.log(tree);
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

export const logIn = (username, pwd)=> {
  auth.login()
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