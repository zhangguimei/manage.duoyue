'use strict';
module.exports = {
  path: 'orderform',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/OrderForm'))
    })
  }
}