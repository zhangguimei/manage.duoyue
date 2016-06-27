/*
 * Created on 2016-06-27 10:38
 *
 * By Susan Su
 */

'use strict';
require('es6-promise').polyfill();
import axios from 'axios';
import {BASE_API_ROOT, COOKIE, tenantId} from '../../config';

import {get} from '../utils/cookie';
import auth from './auth';

axios.defaults.baseURL = BASE_API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//在头部增加租户ID
//axios.defaults.headers.common['tenantId'] = 0;

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  config.headers = config.headers || {};

  console.log('axios request', config)
  if(get(COOKIE)) {
    config.headers.Authorization = get(COOKIE).replace(/(^\")|(\"$)/g, '');
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

export const TagResource = (method, id, data, api = 'tags') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const BookTypeResource = (method, id, data, api = 'bookType') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

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