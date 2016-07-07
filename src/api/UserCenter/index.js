/*
 * Created on 2016-06-29 11:28
 *
 * By Susan Su
 */

'use strict';

import {systemId} from '../../../config';
import auth from '../auth';
import { UserCenter } from '../axiosServices';

//权限管理->登录用户
export default  {
  //登录 /user/doLogin
  login: (values) => {
    let data = {"systemId": systemId, "userName": values.username, "pwd": values.password};
    return UserCenter('post', 'user', 'login', data);
  },

  //根据token获取用户信息 /user/getInfo
  getInfoByToken: (token = auth.getCookie('token')) => {
    return UserCenter('get', 'user', 'getInfo', {
      headers: {
        'token': token
      }
    })
  },

  ///登出 /user/loginOut
  loginOut: () => {
    return UserCenter('post', 'user', 'loginOut');
  }
}