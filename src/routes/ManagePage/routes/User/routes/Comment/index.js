/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'comment',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Comment'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Article'),
        require('./routes/Book'),
        require('./routes/Source'),
        require('./routes/Topic'),
        require('./routes/Group')
      ])
    })
  },
}
