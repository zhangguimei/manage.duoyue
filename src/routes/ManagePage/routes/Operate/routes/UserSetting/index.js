/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'usersetting',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UserSetting'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/UserSearch'),
        require('./routes/ReceiveMsg'),
        require('./routes/PhotoMaterial'),
        require('./routes/TextMaterial'),
        require('./routes/ReceiveMsg'),
        require('./routes/LabelSearch')
      ])
    })
  }
}