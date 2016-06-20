/*
 * Created on 2016-06-26 10:43
 *
 * By Susan Su
 */

'use strict';
'use strict';
module.exports = {
  path: 'showcase',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ShowCase'))
    })
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Book'),
        require('./routes/Product'),
        require('./routes/Source'),
      ])
    })
  },
}
