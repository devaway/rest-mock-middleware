const express = require('express');
const restMockMiddleware = require('../index');
const {
  resolve
} = require('path');

function createServer(options) {
  var app = express();
  app.use('/app', restMockMiddleware({
    root_dir: resolve(__dirname, options.root_dir),
    logger: options.logger,
    loggerDebugFilters: options.loggerDebugFilters,
  }));

  return app;
}

module.exports = createServer;
