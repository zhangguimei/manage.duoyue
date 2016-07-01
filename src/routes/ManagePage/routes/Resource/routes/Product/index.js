/*
 * Created on 2016-06-25 11:40
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'product',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Product'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ProductSearch'),
        require('./routes/ProductSort')
      ])
    })
  }
}
