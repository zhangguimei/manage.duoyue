/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'author',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/AuthorManage'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AuthorSearch'),
        require('./routes/AuthorSort')
      ])
    })
  }
}
