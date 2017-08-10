var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = require('../src/config');
var postcssConfig = require('./postcss.config');

const isDebug = process.env.NODE_ENV !== 'production';


var webpackConfig = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + config.port,
    // 'webpack/hot/only-dev-server',
    './src/client.js'
  ],

  output: {
    publicPath: '/public/',
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    path: path.resolve(__dirname, '../build'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ]
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          fallback: ['style-loader'],
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
            // postcssConfig,
          ],
          publicPath: path.join(__dirname, '../build'),
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract({
          fallback: ['style-loader'],
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
            postcssConfig,
          ],
          publicPath: path.join(__dirname, '../build'),
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',/* (getPath) => {
        return getPath('[name].css').replace('css/js', 'css');
      },*/
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      }
    }),
  ],
  devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
};

// Optimize the bundle in release (production) mode
// if (!isDebug) {
//   webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
//   webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: isVerbose } }));
// }

module.exports = webpackConfig;
