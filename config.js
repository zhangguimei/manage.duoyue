require('babel-polyfill');

const config = {
  baseApiUrl: 'http://api.duoyue.me', //mock
  debug: process.env.NODE_ENV !== 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.NODE_ENV !== 'production' ? 8050 : 8055,
  COOKIE_DOMAIN: 'iuserInfo'
};

module.exports = config;