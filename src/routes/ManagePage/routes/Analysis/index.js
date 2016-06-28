module.exports = {
  path: 'analysis',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Analysis'))
    })
  }
}