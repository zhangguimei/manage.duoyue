'use strict';
module.exports = {
  path: 'system',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/System'))
    })
  }
}