/*
 * Created on 2016-06-21 16:52
 *
 * By Susan Su
 */

'use strict';
import cookie from 'react-cookie';
import { CookieDomain } from '../../config';
let cookieConfig = {};
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }
}

module.exports = {
  saveCookie(name, value){
    cookie.save(name, value, cookieConfig)
  },

  getCookie(name) {
    return cookie.load(name)
  },

  removeCookie(name) {
    cookie.remove(name, cookieConfig);
  },

  logout() {
    cookie.remove('token', cookieConfig);
  },

  loggedIn() {
    return !!cookie.load('token');
  }
}
