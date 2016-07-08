'use strict';
module.exports = {
  path: 'struct',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/TagStruct'))
    })
  }
};
