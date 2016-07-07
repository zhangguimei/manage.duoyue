/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'basic',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Basic'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/CustomMenu'),
        require('./routes/GroupManage'),
        require('./routes/OperateSetting'),
        require('./routes/PublicAuthority'),
        require('./routes/ResponseMsg')
      ])
    })
  },
}
