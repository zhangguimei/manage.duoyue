/*
 * Created on 2016-06-26 10:43
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'showrange',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ShowRange'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/BookTypeSetting'),
        require('./routes/ColumnSetting'),
        require('./routes/MatchSetting'),
        require('./routes/ProductSetting'),
        require('./routes/SouceTypeSetting'),
        require('./routes/TopicTypeSetting')
      ])
    })
  },
}
