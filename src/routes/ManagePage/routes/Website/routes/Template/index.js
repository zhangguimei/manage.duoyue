/*
 * Created on 2016-07-05 10:00
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'template',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Template'))
    })
  }
}