/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'sales',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sales'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/HotProduct'),
        require('./routes/SalesStatistics')
      ])
    })
  }
}
