/*
 * Created on 2016-06-25 12:22
 *
 * By Susan Su
 */

'use strict';
import auth from '../../api/auth';
// function redirectToDashboard(nextState, replace) {
//   if (auth.loggedIn()) {
//     replace('/')
//   }
// }
module.exports = {
  //onEnter: redirectToDashboard,
  indexRoute: {
    onEnter: (nextState, replace) =>{
      if (auth.loggedIn()) {
        replace('/')
      }
    }
  },
  path: '/login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/LoginPage'))
    })
  }
}
