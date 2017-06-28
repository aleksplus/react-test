var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var wpConfig = require('./webpack.config');
var config = require('../src/config');
var shell = require('shelljs');

var WEBPACK_HOST = process.env.HOST || "localhost";
var WEBPACK_PORT = config.port + 1;

new WebpackDevServer(webpack(wpConfig), {
  publicPath: wpConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '*': { target: `http://${WEBPACK_HOST}:${WEBPACK_PORT}` }
  },
  inline: true, // Inline mode is recommended when using Hot Module Replacement.
  stats: {
    colors: true
  }
}).listen(config.port, function () {
  shell.env.PORT = shell.env.PORT || WEBPACK_PORT;
  shell.exec('"./node_modules/.bin/nodemon" start.js -e js,jsx', function () {});
  console.log('Webpack Dev Server listening on port ', config.port);
});
