/*
 *  Project : User Setting
 *  Date    : 2016/7/4
 *  Author  : Melody Yuen
 *  Declare : index
 */

'use strict';
module.exports = {
  path: 'custommenu',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/CustomMenu'))
    })
  }
}