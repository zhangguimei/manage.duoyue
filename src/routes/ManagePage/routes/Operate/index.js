'use strict';
module.exports = {
  path: 'operate',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Operate'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/WeixinFill'),
        require('./routes/Display'),
        require('./routes/Basic'),
        require('./routes/UserSetting'),
        require('./routes/CustomerService'),
        require('./routes/App'),
        require('./routes/Message'),
        require('./routes/Statistics'),
        require('./routes/Merchant')
      ])
    })
  }
}