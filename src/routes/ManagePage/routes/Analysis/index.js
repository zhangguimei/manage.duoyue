/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'analysis',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Analysis'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/User'),
        require('./routes/Resource')
      ])
    })
  }
}