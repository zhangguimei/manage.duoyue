/*
 * Created on 2016-06-21 16:52
 *
 * By Susan Su
 */

'use strict';
import * as cookie from '../utils/cookie';
import axios from 'axios';
import { getBookType } from './axiosServices';

module.exports = {
  login(username, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (!!cookie.get('name')) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    pretendRequest(username, pass, (res) => {
      if (res.authenticated) {
        cookie.set('name',res.token);
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  },

  getToken() {
    return cookie.get('name');
  },

  logout(cb) {
    cookie.remove('name');
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!cookie.get('name');
  },

  onChange() {}
}

function pretendRequest(username, pass, cb) {

  // //getBookType();
  //
  // axios.post('/usercenter/user/doLogin', {
  //   "userName":"314525465@qq.com",
  //   "pwd": "miss0423"
  // })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // var config = {
  //   headers: {
  //     tenantId: 0,
  //     systemId: 0,
  //     //userId: 0
  //   }
  // }
  // axios.get('/usercenter/partyType/list')
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  setTimeout(() => {
    if (username === 'admin' && pass === '1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
