/*
 * Created on 2016-07-05 14:40
 *
 * By guolong
 */

'use strict';
module.exports = {
  path: 'system',
  indexRoute: { onEnter: redirectToLogin},
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/System'))
    })
  },
  getChildRoutes(nextState,cb) {
  	require.ensure([],(require)=>{
  		cb(null, [
  			require('./routes/Staff'),
  			require('./routes/UserAuthority'),
  			require('./routes/SystemAccount')
  			])
  	})
  }
}