import express from 'express';

import path from 'path';
import render from './render';
import config from './../config';

const staticPath = path.join(__dirname, './../../static');
const server = express();
const port = process.env.PORT || config.port;

server.use('/public', express.static(path.join(__dirname, './../../build')));
server.use('/static', express.static(staticPath));
server.use(render);
server.listen(port);
console.log('Application listening on port ' + port);


export default server;
