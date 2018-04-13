const express = require('express');
const restMockMiddleware = require('../index');
const {
  resolve
} = require('path');

function createServer(options) {
  var app = express();
  app.use('/app', restMockMiddleware({
    root_dir: resolve(__dirname, options.root_dir)
  }));
  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
  });
  return server;
}
module.exports = createServer;