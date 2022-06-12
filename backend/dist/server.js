"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var path = require('path');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
var options = {
    key: fs.readFileSync(path.join(__dirname + '/keys/key.pem')),
    cert: fs.readFileSync(path.join(__dirname + '/keys/cert.pem'))
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running https://localhost:3001');
});
