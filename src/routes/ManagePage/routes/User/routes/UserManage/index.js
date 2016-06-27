/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'usermanage',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UserManage'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/UserSearch'),
        require('./routes/UserImage'),
        require('./routes/UserVideo'),
        require('./routes/GroupManage')
      ])
    })
  },
}
