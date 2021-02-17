/**
 * function that match the check the query parameters and
 */
const queryParameters = function (logger, request, req, ajv) {
  // if no queryParameters then this check match
  let paramsMatch = true;
  // if there are query parameters seach for one that doesn't match.
  if (request.queryParameters) {
    Object.getOwnPropertyNames(request.queryParameters).forEach((name) => {
      if (
        !req.query[name] ||
        request.queryParameters[name] != req.query[name]
      ) {
        paramsMatch = false;
      }
    });

    logger.log({
      level: 'debug',
      type: 'match-query',
      message: `Query matching:\nRequest =>\n${JSON.stringify(
        {
          query: req.query,
        },
        null,
        2,
      )}\nMatching config =>\n${JSON.stringify(
        {
          queryParameters: request.queryParameters,
        },
        null,
        2,
      )}\nMatched: ${paramsMatch}`,
    });
  }

  if (request.querySchema) {
    let result = false;

    try {
      const schema = request.querySchema;
      const validator = ajv.compile(schema);
      result = validator(req.query);
      logger.log({
        level: 'debug',
        type: 'match-query',
        message: JSON.stringify(validator.errors, null, 2),
      });
      ajv.removeSchema(schema);
    } catch (e) {
      logger.log({
        level: 'error',
        type: 'match-query',
        message: `${e.stack || e}`,
      });
      result = false;
    }

    if (!result) {
      paramsMatch = false;
    }

    logger.log({
      level: 'debug',
      type: 'match-query',
      message: `Query matching:\nRequest =>\n${JSON.stringify(
        {
          query: req.query,
        },
        null,
        2,
      )}\nMatching config =>\n${JSON.stringify(
        {
          queryParameters: request.querySchema,
        },
        null,
        2,
      )}\nMatched: ${paramsMatch}`,
    });
  }

  return paramsMatch;
};

module.exports = queryParameters;
