const urlRequestMatching = require('./url');
const methodRequestMatching = require('./method');
const headersRequestMatching = require('./headers');
const queryRequestMatching = require('./query-parameters');
const bodyRequestMatching = require('./body');

module.exports.urlRequestMatching = urlRequestMatching;
module.exports.methodRequestMatching = methodRequestMatching;
module.exports.headersRequestMatching = headersRequestMatching;
module.exports.queryRequestMatching = queryRequestMatching;
module.exports.bodyRequestMatching = bodyRequestMatching;
