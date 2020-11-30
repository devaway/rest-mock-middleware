const equal = require("node-json-equal");
const jsonpath = require("jsonpath");

const bodyCheck = function (logger, request, req, ajv) {
  let bodyMatch = true;
  if (request.bodyPatterns) {
    if (request.bodyPatterns.equalToJson) {
      let equalOptions = {
        arrayOrder: true,
      };
      if (request.bodyPatterns.ignoreArrayOrder == false) {
        equalOptions.arrayOrder = false;
      }

      if (!equal(request.bodyPatterns.equalToJson, req.body, equalOptions)) {
        bodyMatch = false;
      }
    }

    if (request.bodyPatterns.matchesJsonPath) {
      var result = jsonpath.query(
        req.body,
        request.bodyPatterns.matchesJsonPath
      );
      if (result.length <= 0) {
        bodyMatch = false;
      }
    }

    if (request.bodyPatterns.matchesSchema) {
      let result = false;

      try {
        if (request.bodyPatterns.matchesSchema.schema) {
          const schema = request.bodyPatterns.matchesSchema.schema;
          const validator = ajv.compile(schema);
          result = validator(req.body);
          logger.log({
            level: "debug",
            type: "match-schema",
            message: JSON.stringify(validator.errors, null, 2),
          });
          ajv.removeSchema(schema);
        } else {
          const fileName = request.bodyPatterns.matchesSchema.schemaFile;
          const v = ajv.validate(fileName, req.body);
          logger.log({
            level: "debug",
            type: "match-schema",
            message: JSON.stringify(v.errors, null, 2),
          });
          result = v.validated;
        }
      } catch (e) {
        logger.log({
          level: "error",
          type: "match-schema",
          message: JSON.stringify(e, null, 2),
        });
        result = false;
      }

      if (!result) {
        bodyMatch = false;
      }
    }

    logger.log({
      level: "debug",
      type: "match-body",
      message: `Body matching:\nRequest =>\n${JSON.stringify(
        {
          body: req.body,
        },
        null,
        2
      )}\nMatching config =>\n${JSON.stringify(
        {
          bodyPatterns: request.bodyPatterns,
        },
        null,
        2
      )}\nMatched: ${bodyMatch}`,
    });
  }
  return bodyMatch;
};

module.exports = bodyCheck;
