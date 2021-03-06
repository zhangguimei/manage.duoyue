/*
 * Created on 2016-06-26 10:43
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'redpacket',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/RedPacketApp'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/RedPacketActivity'),
        require('./routes/RedPacketGroup')
      ])
    })
  },
}
