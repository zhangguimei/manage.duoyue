/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';

module.exports = {
  path: 'user',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/User'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/UserManage'),
        require('./routes/Comment'),
        require('./routes/AuthorManage'),
        require('./routes/GroupManage')
      ])
    })
  }
}
