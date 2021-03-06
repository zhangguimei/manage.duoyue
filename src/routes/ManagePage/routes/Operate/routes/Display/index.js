/*
 * Created on 2016-06-26 10:49
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'display',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Display'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ShowCase'),
        require('./routes/Invoice'),
        require('./routes/ShowRange'),
        require('./routes/ColumnSetting'),
        require('./routes/StyleTemplate')
      ])
    })
  },
}
