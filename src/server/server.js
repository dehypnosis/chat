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
  const initialState = {};
  return `
  <!doctype html>
  <html lang="utf-8">
    <head>
      <title>React/MobX boilerplate</title>
      <script>
        window.initialState= ${JSON.stringify(initialState)}
      </script>
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
app.get('/', function(req, res) {
  const initView = renderToString((
    <App />
  ));
  const page = renderFullPage(initView);
  res.status(200).send(page);
})
//404 handler
app.get('*', function(req, res) {
  res.status(404).send('404 not found.')
});
//global error catcher
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});

