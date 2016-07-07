/*
 *  Date    : 2016.7.4
 *
 *  Author  : Zhang Guimei
 */
'use strict';
module.exports = {
  path: 'scanattention',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ScanAttention'))
    })
  }
}
