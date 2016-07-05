/*
 *  Date    : 2016.7.1
 *
 *  Author  : Zhang Guimei
 */
'use strict';
module.exports = {
  path: 'bookduration',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/BookDuration'))
    })
  }
}
