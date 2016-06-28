/*
 * Created on 2016-06-25 12:22
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'register',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/RegisterPage'))
    })
  }
}
