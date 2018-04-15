const equal = require('node-json-equal');
const jsonpath = require('jsonpath');

const bodyCheck = function(request, req, res) {
  let bodyMatch = true;
  if (request.bodyPatterns) {
    if (request.bodyPatterns.equalToJson) {
      let equalOptions = {
        arrayOrder: true
      };
      if (request.bodyPatterns.ignoreArrayOrder == false) {
        equalOptions.arrayOrder = false;
      }

      if (!equal(request.bodyPatterns.equalToJson, req.body, equalOptions)) {
        bodyMatch = false;
      }

    }

    if (request.bodyPatterns.matchesJsonPath) {
      var result = jsonpath.query(req.body, request.bodyPatterns.matchesJsonPath);
      if (result.length <= 0) {
        bodyMatch = false;
      }
    }
  }
  return bodyMatch;
}

module.exports = bodyCheck;