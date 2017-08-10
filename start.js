require('babel-register');
require('ignore-styles').default(['.sass', '.scss', '.css']);

module.exports = require('./src/server');