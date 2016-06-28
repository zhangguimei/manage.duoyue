var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var config = require('./config');

var host = config.host;
var port = config.port;

var serverOptions = {
  contentBase: webpackConfig.output.path,
  quiet: true,
  noInfo: false,
  hot: true,
  inline: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  }
};

var compiler = webpack(webpackConfig);

var debug = process.env.NODE_ENV !== 'production';
var viewDir = debug ? '/dist' : '/public';

const app = express();
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));
app.use(viewDir, express.static(path.join(__dirname, viewDir)));

// if(debug) {
//   var bs = require('browser-sync').create();
//   bs.init({
//     port: port + 1,
//     proxy: `http://localhost:${port}`
//   });
//
// }
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, viewDir, 'index.html'));
});

app.listen(port, (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log(`The server is running at http://${host}:${port}`);
  }
});