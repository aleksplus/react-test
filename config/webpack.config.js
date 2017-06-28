var webpack = require('webpack');
var path = require('path');

var config = require('../src/config');

var webpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
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
      }
    }),
  ],
  devtool: 'cheap-module-eval-source-map'
};


module.exports = webpackConfig;
