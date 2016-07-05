/*
 * Created on 2016-06-27 15:20
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'bannermanage',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AdvertisingManage'))
    })
  }
}