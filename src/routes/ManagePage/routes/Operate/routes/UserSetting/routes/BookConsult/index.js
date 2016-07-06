/*
 * Created on 2016/6/29
 * 
 * by Melody Yuen
 */

'use strict';
module.exports = {
  path: 'bookconsult',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/BookConsult'))
    })
  }
}