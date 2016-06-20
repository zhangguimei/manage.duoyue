/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'comment',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Comment'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/BookConsult'),
        require('./routes/SiteColumn'),
        require('./routes/Book'),
        require('./routes/Source')
      ])
    })
  },
}
