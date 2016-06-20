module.exports = {
  path: '/analysis',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Analysis'))
    })
  }
}