/*
 * Created on 2016-07-05 14:40
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'password',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/SystemAccount'))
    })
  }
}