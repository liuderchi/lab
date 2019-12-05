import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const isMobile = !!req.query.isMobile;
  const initialState = { isMobile };
  const appString = renderToString(<App {...initialState} />);

  // const appString = renderToString(<App />);

  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});

server.listen(8080);
console.log('listening');
