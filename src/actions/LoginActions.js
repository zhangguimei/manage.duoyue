'use strict';
import { push } from 'react-router-redux';
import {LOG_IN, LOG_OUT, LOGGED_IN, GET_USERINFO} from '../constants/constants';
import {parseJson} from 'UtilsFolder/getDataInfo';
import auth from '../api/auth';
import { getBookType } from '../api/axiosServices';
import usercenterapi from 'APIFolder/UserCenter';
import {showMsg} from './commonActions';

export const loginByAccount = (loginInfo, callback) => {
  return (dispatch)  => {
    return usercenterapi.login(loginInfo)
        .then(response => ({json: response.data, status: response.statusText})) //所有axios返回值都有data和statusText, 在data里面真正后台返回来的数据
        .then(({json,status}) => {
          if(status !== 'OK'){
            return dispatch(showMsg(json.message || '登录失败'));
          }

          let returnData = json.data;
          //得到token,并存储
          auth.setToken(returnData.token);

          dispatch(loginSuccess(returnData));
         // fetchTreedata(returnData.userName);
          console.log("操作员是 ", returnData.userName, returnData.permissions);

          callback && callback();
        }).catch(err=>{
          callback && callback(err.data, err.status);
        })
  }
}

export const loginByToken = (callback) => {
  return (dispatch)  => {
    return usercenterapi.getInfoByToken()
        .then(response => ({json: response.data, status: response.statusText})) //所有axios返回值都有data和statusText, 在data里面真正后台返回来的数据
        .then(({json,status}) => {
          if(status !== 'OK'){
            return dispatch(showMsg(json.message || '登录失败'));
          }

          let returnData = json.data;

          dispatch(loginSuccess(returnData));
          // fetchTreedata(returnData.userName);
         // console.log("操作员是 ", returnData.userName, returnData.permissions);

          callback && callback();
        }).catch(err=>{
          auth.logout();
          callback && callback(err.data, err.status);
        })
  }
}

export const fetchTreedata = (username) => {
  //getBookType();
  let tree = "";
  switch (username) {

    case 'admin':
      tree = require("../assets/MockData/tree_data.json");
        console.log(tree.menu);

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

      console.log("susan" ,dataMap);

      break;
    case 'admin2':
      tree = require("../assets/MockData/tree_data2.json");
      break;
    default:
      tree = require("../assets/MockData/tree_data.json");
  }
  parseJson(tree.menu,'');
  parseJson(tree.fast,'');
  //console.log(tree);
  return dispatch => {
    return dispatch(loggedIn(username, tree));
  }
}

//退出登录
export const doLogOut = () => {
  return dispatch => {
    // usercenterapi.loginOut();  //登出API还有问题??
    auth.logout();
    return dispatch(logOut());
  }
}

const loggedIn = (userName, tree) => {
  return {
    type: LOGGED_IN,
    userName,
    tree
  }
}

//通过账号登录
export const loginSuccess = (login)=> {
  return {
    type: LOG_IN,
    login
  }
}

export const logOut = ()=> {
  return {
    type: LOG_OUT
  }
}


