require('babel-polyfill');

//spaceInfo	username=chenmin&id=11356&weixinid=0&roleid=-1&rays_roleid=-1&space_user_id=-1
const config = {
  BASE_API_ROOT: 'http://localhost:8058', //development api addredss
  debug: process.env.NODE_ENV !== 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.NODE_ENV !== 'production' ? 8058 : 8055,
  COOKIE: 'spaceInfo',
  username: null,
  tenantId: 0,
  systemId: 0,
  userId: 0
};

module.exports = config;

//http://192.168.88.139:86