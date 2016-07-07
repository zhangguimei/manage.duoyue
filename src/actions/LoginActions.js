'use strict';
import {LOG_IN, LOG_OUT, LOGGED_IN} from '../constants/constants';
import auth from '../api/auth';
import { getBookType } from '../api/axiosServices';
import usercenterapi from 'APIFolder/UserCenter';
import {showMsg} from './commonActions';

//通过账号登录获取信息
export const loginSuccess = (userInfo)=> {
  return {
    type: LOG_IN,
    userInfo
  }
}

//通过token获取信息
export const loggedIn = (userInfo)=> {
  return {
    type: LOGGED_IN,
    userInfo
  }
}
//退出系统
export const logOut = ()=> {
  return {
    type: LOG_OUT
  }
}

export const loginByAccount = (loginInfo, callback) => {
  return (dispatch)  => {
    // const menuData = require('AssetsFolder/MockData/menu_data.json');
    // dispatch(loginSuccess(menuData));
    return usercenterapi.login(loginInfo)
        .then(response => ({json: response.data, status: response.statusText})) //所有axios返回值都有data和statusText, 在data里面真正后台返回来的数据
        .then(({json,status}) => {
          if(status !== 'OK'){
            return dispatch(showMsg('登录失败'));
          }
          let userInfo = json.data;
          //得到token,并存储
          auth.saveCookie('token', userInfo.token);

          //为了测试用
          const menuData = require('AssetsFolder/MockData/menu_data.json');
          Object.assign(userInfo, {"fast": menuData.data.fast, "permissions": menuData.data.permissions});
          console.log("操作员是 ", userInfo.fast, userInfo.permissions);

          dispatch(loginSuccess(userInfo));
          callback && callback();
        }).catch(err=>{
          callback && callback(err.data || '登录失败,请检查网络问题');
        })
  }
}

//通过TOKEN来获取信息, 在主界面刷新使用
export const loginByToken = (callback) => {
  return (dispatch)  => {
    return usercenterapi.getInfoByToken()
        .then(response => ({json: response.data, status: response.statusText})) //所有axios返回值都有data和statusText, 在data里面真正后台返回来的数据
        .then(({json,status}) => {
          if(status !== 'OK'){
            return dispatch(showMsg('登录失败'));
          }
          console.log('loginByToken');
          let userInfo = json.data;

          //为了测试用
          const menuData = require('AssetsFolder/MockData/menu_data.json');
          Object.assign(userInfo, {"fast": menuData.data.fast, "permissions": menuData.data.permissions});

          dispatch(loginSuccess(userInfo));
          callback && callback();
        }).catch(err=>{
          auth.logout();
          callback && callback(err.data, err.status);
        })
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




