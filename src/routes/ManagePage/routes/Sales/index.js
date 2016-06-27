'use strict';
module.exports = {
  path: 'sales',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sales'))
    })
  }
}