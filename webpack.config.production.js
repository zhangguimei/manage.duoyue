require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.join(__dirname, 'public');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/index.js'],
    vendor: [
      'babel-polyfill',
      'isomorphic-fetch',
      'react',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    filename: '[name]-[hash].min.js',
    path: assetsPath,
    publicPath: '/'
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'RAYS',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'favicon.ico')
    }),
    new ExtractTextPlugin('[name].[hash].css', {allChunks: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      mangle: false
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loader: "react-hot!babel",
        exclude: [/node_modules/, /dist/] },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!sass?outputStyle=expanded&sourceMap" +
            "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules"))
        )
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]'
      },
      { test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        loader: "url-loader?limit=1&name=assets/fonts/[name].[ext]"
      },
      { test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ["last 2 versions"] })
  ],
  resolve: {
    extensions: ['', '.js', '.map', '.json'],
    modulesDirectories: ["src", "node_modules"],
    alias: {
      config: path.join(__dirname, 'config.js'),
      IScroll: path.join(__dirname, 'src/libs/iscroll-zoom.min.js')
    }
  }
};
