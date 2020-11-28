const equal = require("node-json-equal");
const jsonpath = require("jsonpath");
const ajv = require("ajv");
const fs = require("fs");
const path = require("path");

const ajValidator = ajv({ allErrors: true });

const bodyCheck = function (request, req, res, mocksConfiguration) {
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
      let schema = null;
      if (request.bodyPatterns.matchesSchema.schema) {
        schema = request.bodyPatterns.matchesSchema.schema;
      }
      try {
        if (request.bodyPatterns.matchesSchema.schemaFile) {
          let filePath = path.normalize(
            path.resolve(
              __dirname,
              mocksConfiguration.root_dir +
                "/schemas/" +
                request.bodyPatterns.matchesSchema.schemaFile
            )
          );
          schema = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        const validate = ajValidator.compile(schema);
        const result = validate(req.body);
        if (!result) {
          bodyMatch = false;
        }
      } catch (e) {
        console.log(e);
        bodyMatch = false;
      }
    }
  }
  return bodyMatch;
};

module.exports = bodyCheck;
