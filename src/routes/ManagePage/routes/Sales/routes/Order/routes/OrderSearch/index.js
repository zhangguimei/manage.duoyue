/*
 * Created on 2016-06-30 10:00
 *
 * By Zhang-Guimei
 */
'use strict';
module.exports = {
  path: 'search',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/OrderSearch'))
    })
  }
}
