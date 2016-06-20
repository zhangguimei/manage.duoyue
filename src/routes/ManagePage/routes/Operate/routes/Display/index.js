/*
 * Created on 2016-06-26 10:49
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'display',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Display'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ShowCase'),
        require('./routes/Invoice'),
        require('./routes/ShowRange'),
        require('./routes/ViewRange')
      ])
    })
  },
}
