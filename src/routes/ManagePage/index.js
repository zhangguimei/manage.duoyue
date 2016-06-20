/*
 * Created on 2016-06-24 16:00
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: '/',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ManagePage'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/User'),
        require('./routes/Resource'),
        require('./routes/Operate'),
        require('./routes/Website'),
        require('./routes/Sales'),
        require('./routes/Analysis'),
        require('./routes/System')
      ])
    })
  },
}
