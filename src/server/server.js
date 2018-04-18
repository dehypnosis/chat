import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import path from 'path';

import { renderToString } from 'react-dom/server';

import React from 'react';
import App from '../client/components/App.js';

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config               = require('../../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
  return `
  <!doctype html>
  <html lang="utf-8">
    <head>
      <title>Codeflow Chat</title>
      <link rel="stylesheet" href="/static/bundle.css" />
      <meta name="viewport" content="width=device-width, user-scalable=no">
    </head>
    <body>
      <section id="app"><div>${html}</div></section>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
};

app.use(compression());
app.use(bodyParser.json());
app.use(logger('dev'));

//Root
app.get('*', function(req, res) {
  const initView = renderToString((
    <App state={{}} socket={{}} />
  ));
  const page = renderFullPage(initView);
  res.status(200).send(page);
})

//global error catcher
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException: ', evt);
});

// Attach ws server and listen
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000, function(){
  console.log('Listening on port 3000');
});

if (process.env.NODE_ENV != 'production') {
  const fs = require('fs');
  io.on('connection', function(...args) {
    // Dynamically reload socket handler for fast deveolpment environment
    // Invalidate all cached module in current directory
    fs.readdirSync(__dirname).forEach(file => {
      delete require.cache[require.resolve(`./${file}`)];
    });
    return require('./socket').default(io).apply(null, args);
  });
} else {
  io.on('connection', require('./socket').default(io));
}
