/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'period',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Period'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AllInfomation'),
        require('./routes/NatureAttention'),
        require('./routes/ScanAttention'),
        require('./routes/CancelAttention'),
        require('./routes/Scan'),
        require('./routes/BrowseRead'),
        require('./routes/OrderPay'),
        require('./routes/AttendComment'),
        require('./routes/ShareContent')
      ])
    })
  }
}
