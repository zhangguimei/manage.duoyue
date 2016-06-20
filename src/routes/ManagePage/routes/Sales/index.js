'use strict';
module.exports = {
  path: '/sales',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sales'))
    })
  }
}