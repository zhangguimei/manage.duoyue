'use strict';
module.exports = {
  path: 'website',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Website'))
    })
  }
}