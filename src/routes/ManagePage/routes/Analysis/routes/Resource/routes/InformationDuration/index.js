/*
 *  Date    : 2016.7.1
 *
 *  Author  : Zhang Guimei
 */
'use strict';
module.exports = {
  path: 'infoduration',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/InformationDuration'))
    })
  }
}
