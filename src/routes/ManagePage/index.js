/*
 * Created on 2016-06-24 16:00
 *
 * By Susan Su
 */

'use strict';
import auth from '../../api/auth';

function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace('/login')
  }else {
    replace('/user')
  }
}

module.exports = {
  path: '/',
  indexRoute: {onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ManagePage'))
    })
  },
  getChildRoutes(location, cb) {

    // onEnter:  {
    //   console.log(456);
    // }
    if (!auth.loggedIn()) {
      console.log(123,location.pathname, cb)
    }
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/User'),
        require('./routes/Resource'),
        require('./routes/Operate'),
        require('./routes/Website'),
        require('./routes/Sales'),
        require('./routes/Analysis'),
        require('./routes/System')
      ])
    })
  }
}
