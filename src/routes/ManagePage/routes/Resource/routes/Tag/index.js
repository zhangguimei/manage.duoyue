'use strict';
module.exports = {
  path: 'tag',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Tag'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ExtendedAttr'),
        require('./routes/TagStruct')
      ])
    })
  }
}
