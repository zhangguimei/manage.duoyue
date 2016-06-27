import auth from './api/auth';

function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
window.redirectToLogin = redirectToLogin;

export default {
  component: require('./components/App'),
  childRoutes: [
    require('./routes/LoginPage'),
    require('./routes/RegisterPage'),
    require('./routes/ManagePage'),
    require('./routes/NotFound')

  ]
}
