'use strict';
module.exports = {
  path: 'resource',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Resource'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Article'),
        require('./routes/Book'),
        require('./routes/Eresource'),
        require('./routes/Product'),
        require('./routes/CrowdFunding'),
        require('./routes/Tag'),
        require('./routes/Match'),
        require('./routes/Topic')
      ])
    })
  }
}