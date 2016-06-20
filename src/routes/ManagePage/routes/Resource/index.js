'use strict';
module.exports = {
  path: '/resource',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Resource'))
    })
  }
}