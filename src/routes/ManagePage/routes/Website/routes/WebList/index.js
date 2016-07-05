/*
 * Created on 2016-07-05 10:40
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'list',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/WebList'))
    })
  }
}