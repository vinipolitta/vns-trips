import * as jsonServer from 'json-server';
import { Express } from 'express';

import * as fs from 'fs';
import * as https from 'https';
var path = require('path');


const server: Express = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

var options = {
  key: fs.readFileSync(path.join(__dirname + '/keys/key.pem')),
  cert:  fs.readFileSync(path.join(__dirname + '/keys/cert.pem'))
};


https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running https://localhost:3001');
});
