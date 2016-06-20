'use strict';
module.exports = {
  path: '/system',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/System'))
    })
  }
}