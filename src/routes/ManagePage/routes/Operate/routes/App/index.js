/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'apply',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/App'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/WeiXinQRcode'),
        require('./routes/KeywordApp'),
        require('./routes/RedPacketApp')
      ])
    })
  },
}
