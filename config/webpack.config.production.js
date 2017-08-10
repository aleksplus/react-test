var webpack = require('webpack');
var path = require('path');

var config = require('../src/config');
var postcssConfig = require('./postcss.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  entry: [
    './src/client.js'
  ],
  output: {
    publicPath: '/public/',
    filename: '[name].min.js',
    chunkFilename: '[name]-chunk.min.js',
    path: path.resolve(__dirname, '../build'),
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
            // 'css-loader',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      },
    }),

    new ExtractTextPlugin({
      filename: '[name].min.css',/* (getPath) => {
        return getPath('[name].css').replace('css/js', 'css');
      },*/
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min.js',
      minChunks(module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi]
    })
  ],
  devtool: 'cheap-module-source-map',
};


module.exports = webpackConfig;
