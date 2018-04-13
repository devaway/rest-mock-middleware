/**
 * function that match the check the query parameters and
 */
const queryParametersCheck = function(request, req) {
  // if no queryParameters then this check match
  let paramsMatch = true;
  // if there are query parameters seach for one that doesn't match.
  if (request.queryParameters) {
    Object.getOwnPropertyNames(request.queryParameters).forEach((name) => {
      if (!req.query[name]) {
        paramsMatch = false;
      } else if (request.queryParameters[name] != req.query[name]) {
        paramsMatch = false;
      }
    });
  }
  return paramsMatch;
};

module.exports = queryParametersCheck;