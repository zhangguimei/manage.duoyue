/*
 * Created on 2016-06-26 10:43
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'columnsetting',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ColumnSetting'))
    })
  }
}
