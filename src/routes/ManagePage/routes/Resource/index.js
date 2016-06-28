'use strict';
module.exports = {
  path: 'resource',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Resource'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Article'),
        require('./routes/Book'),
        require('./routes/Product'),
        require('./routes/Topic'),
        require('./routes/Project'),
        require('./routes/Match')
      ])
    })
  }
}