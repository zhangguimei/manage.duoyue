'use strict';
module.exports = {
  path: 'website',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Website'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AdvertiseManage'),
        require('./routes/AdvertiseArea'),
        require('./routes/Template'),
        require('./routes/WebList')
      ])
    })
  }
}