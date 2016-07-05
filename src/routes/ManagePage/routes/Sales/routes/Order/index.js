/*
 * Created on 2016-06-30 10:00
 *
 * By Zhang-Guimei
 */
'use strict';
module.exports = {
  path: 'order',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Order'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/OrderSearch')
      ])
    })
  }
}