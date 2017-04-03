'use strict';

/* eslint max-len: "off" */

const webpackAssets = require('../webpack-assets.json');

module.exports = function serveApp(req, res) {
  const devMode = res.app.get('env') === 'development';

  const initialData = JSON.stringify({
    auth: {
      user: req.user
    }
  });

  const markup = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Moolah</title>
        <meta name="description" content="Track your finances.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9721b4">
        <meta name="theme-color" content="#ffffff">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/style.css">
        ${devMode && `<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>`}
      </head>
      <body>
        <div class="app-container"></div>
        <script type="text/json" id="initial-data">
          ${initialData}
        </script>
        <script src="/${webpackAssets.manifest.js}"></script>
        <script src="/${webpackAssets.vendor.js}"></script>
        <script async src="/${webpackAssets.app.js}"></script>
      </body>
    </html>
  `;

  res.send(markup);
};
