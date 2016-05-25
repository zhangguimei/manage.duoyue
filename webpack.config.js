require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT) || 8081;

var assetsPath = path.join(__dirname, 'dist');
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'app.js',
    path: assetsPath,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'RAYS-2.0',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'favicon.ico')
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.json$/,
        loader: "json-loader"
      },
      { test: /\.js$/,
        loader: "react-hot!babel",
        exclude: [/node_modules/, /dist/]
      },
      {
        test: /\.css$/,
        loader: "style!css!postcss"
      },
      {
        test: /\.scss$/,
        loader: "style!css!postcss!sass"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]'
      },
      { test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        loader: "url-loader?importLoaders=1&limit=8192&name=assets/fonts/[name].[ext]"
      }
    ],
    noParse: [path.resolve(nodeModulesPath, '/react/dist/react.min'),path.resolve(nodeModulesPath, '/lodash/lodash.js')]
  },
  postcss: [
    autoprefixer()
  ],
  resolve: {
    extensions: ['', '.json', '.js', '.map' ],
    modulesDirectories: ["src", "node_modules"],
    alias: {
      'react-dom': path.join(nodeModulesPath, '/react-dom/dist/react-dom.js'),
      'react-redux': path.join(nodeModulesPath, '/react-redux/dist/react-redux.js'),
      'redux': path.join(nodeModulesPath, '/redux/dist/redux.js'),
      'config': path.join(__dirname, 'config.js'),
    }
  }
};
