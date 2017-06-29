var webpack = require('webpack');
var path = require('path');

var config = require('../src/config');

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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      },
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
