/*
 * Created on 2016-06-21 16:52
 *
 * By Susan Su
 */

'use strict';
import * as cookie from '../utils/cookie';

module.exports = {
  setToken(name, token){
    cookie.set(name,token);
  },

  getToken() {
    return cookie.get('token');
  },

  logout() {
    cookie.remove('token');
  },

  loggedIn() {
    return !!cookie.get('token');
  },

}
