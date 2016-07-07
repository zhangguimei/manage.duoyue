/*
 * Created on 2016-06-27 10:38
 *
 * By Susan Su
 */

'use strict';
require('es6-promise').polyfill();
import axios from 'axios';
import {BASE_API_ROOT, tenantId, systemId, userId, spaceId, weixinId, unionId} from '../../config';

import auth from './auth';

axios.defaults.baseURL = BASE_API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//在头部增加管理端接口标识
//axios.defaults.headers.common['systemId'] = systemId; //systemId 系统标识，默认为 0（代表云平台）
// axios.defaults.headers.common['tenantId'] = tenantId; //tenantId 租户标识，不同的企业管理端应该不一样，默认为 0（代表理工数传）
// axios.defaults.headers.common['userId'] = userId; //userId 操作员标识 注册或登陆时可以填0，或者不填

// //在头部增加微信端接口
// axios.defaults.headers.common['spaceId'] = spaceId; //spaceId 企业唯一标识
// axios.defaults.headers.common['weixinId'] = weixinId; //weixinId 公众号唯一标识
// axios.defaults.headers.common['unionId'] = unionId; //unionId 用户在一个企业中的唯一标识

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  config.headers = config.headers || {};

  console.log('axios request', config)
  if(auth.getCookie('token')) {
    config.headers.Authorization = auth.getCookie('token').replace(/(^\")|(\"$)/g, '');
  }
  return config;
}, function(error) {
  console.log('axios request error', error)
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  console.log('axios response', response)
  if(response.status === 401) {
    auth.logout();
    window.location.path = '/login'
  }
  return response;
}, function(error) {
  console.log('axios response error', error)
  return Promise.reject(error);
});

export const UserCenter = (method, api, id, data, root = 'usercenter/') => {
  return axios[method](root + api + (id ? ('/' + id) : ''), data)
}

export const ResourceCenter = (method, api, id, data, root = 'resourcecenter/') => {
  return axios[method](root, api + (id ? ('/' + id) : ''), data)
}

// axios.post('/usercenter/user/doLogin', {
//   "userName":"huwei",
//   "pwd": "123456"
// })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

// export const doLogin = () => {
//   axios.post('/user/doLogin', {
//     "userName": "314525465@qq.com",
//     "pwd": "miss0423"
//   })
//       .then(function(response) {
//         console.log(response);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
// }
//
// export const getBookType = () => {
//   axios.get('/resourcecenter/resource/findResByType?resourceTypeId=3&page=1&count=20')
//       .then(function(response) {
//         console.log(response);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
// }