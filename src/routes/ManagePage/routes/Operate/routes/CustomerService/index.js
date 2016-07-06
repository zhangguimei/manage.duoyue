/*
 * Created on 2016-06-25 11:55
 *
 * By Susan Su
 */

'use strict';
module.exports = {
  path: 'customerservice',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/CustomerService'))
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/ChattingRecords'),
        require('./routes/CustomerList')
      ])
    })
  },
}
