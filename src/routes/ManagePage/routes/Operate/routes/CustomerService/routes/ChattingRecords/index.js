/*
 * Created on 2016-06-25 12:15
 *
 * By Susan Su
 */
'use strict';
module.exports = {
  path: 'chattingrecords',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ChattingRecords'))
    })
  }
}