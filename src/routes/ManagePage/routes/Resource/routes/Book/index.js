/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'book',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Book'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/BookSearch'),
        require('./routes/BookSort')
      ])
    })
  }
}
