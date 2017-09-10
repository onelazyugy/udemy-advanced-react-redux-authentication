// main starting point of the application
const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App Setup
// morgan and bodyParser are middleware in express...incoming requests are pass into those middlewares first
// morgan is logging framework, user for debbuging
// bodyParser use to parse incoming request..parse into JSON
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup 
const port = process.env.PORT || 3090
const server = http.createServer(app);//create a http server that receive request and forward to express
server.listen(port);
console.log('Server listening on: ', port);