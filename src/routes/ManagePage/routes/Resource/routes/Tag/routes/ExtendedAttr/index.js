'use strict';
module.exports = {
  path: 'extend',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ExtendedAttr'))
    })
  }
}
