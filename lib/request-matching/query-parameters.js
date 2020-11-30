/**
 * function that match the check the query parameters and
 */
const queryParametersCheck = function (request, req) {
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

    logger.log({
      level: "debug",
      type: "match-query",
      message: `Query matching:\nRequest =>\n${JSON.stringify(
        {
          query: req.query,
        },
        null,
        2
      )}\nMatching config =>\n${JSON.stringify(
        {
          queryParameters: request.queryParameters,
        },
        null,
        2
      )}\nMatched: ${paramsMatch}`,
    });
  }

  return paramsMatch;
};

module.exports = queryParametersCheck;
