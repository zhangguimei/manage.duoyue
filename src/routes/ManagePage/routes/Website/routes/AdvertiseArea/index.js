/*
 * Created on 2016-06-30 11:40
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'bannerarea',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AdvertisingArea'))
    })
  }
}