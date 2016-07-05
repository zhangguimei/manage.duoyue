/*
 * Created on 2016-06-25 11:40
 *
 * By zhenzhen ao
 */

'use strict';
module.exports = {
  path: 'useranalysis',
  indexRoute: {onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/User'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/HotMap'),
        require('./routes/AssembleMap'),
        require('./routes/MassMap'),
        require('./routes/MaleFamaleMap')
      ])
    })
  }
}