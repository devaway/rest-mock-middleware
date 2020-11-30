const ajv = require("ajv");
const path = require("path");
const fs = require("fs");
const walkSyncJson = require("./walk-sync-json");

class AjvValidator {
  constructor(schemaDirectory, logger) {
    this.ajv = ajv({ allErrors: true, schemaId: "auto" });
    this.schemas = new Map();
    this.logger = logger;

    if (fs.existsSync(schemaDirectory) && fs.statSync(schemaDirectory).isDirectory()) {
      let mappingFiles = walkSyncJson(schemaDirectory);
      mappingFiles.forEach((file) => {
        let filename = path.normalize(file).replace(schemaDirectory, "");
        try {
          const schema = JSON.parse(fs.readFileSync(file, "utf8"));
          this.schemas.set(path.normalize(filename), schema);
          this.ajv.addSchema(schema);
          logger.log({
            level: "debug",
            message: `Schema "${filename}" loaded.`
          })
        } catch (e) {
          logger.log({
            level: "error",
            message: `ERROR: invalid schema from: ${filename}`,
          });
        }
      });

      fs.watch(
        schemaDirectory,
        {
          recursive: true,
        },
        (eventType, filename) => {
          let filePath = path.normalize(schemaDirectory + filename);
          if (
            filename &&
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isFile()
          ) {
            logger.log({
              level: "info",
              message: `Realoading: ${filename}`});
            try {
              const schema = 
              JSON.parse(fs.readFileSync(filePath, "utf8"));
              if(this.schemas.has(filename)){
                this.ajv.removeSchema(schema);
              }
              this.schemas.set(
                path.normalize(filename),
                schema
              );
              this.ajv.addSchema(schema);

            } catch (e) {
              logger.log({
                level: "error",
                message: `invalid json from: ${filename}`
              }); 
            }
          } else {
            logger.log({
              level: "error",
              message: "filename not provided"
            });
          }
        }
      );
    }
  }

 validate(fileName, body) {
    if (this.schemas.has(fileName)) {
      const validator = this.ajv.getSchema(this.schemas.get(fileName).id);
      const validated = validator(body);
      return { validated, errors: validator.errors };
    }
    return () => {
      return false;
    };
  };
  
  compile(schema) {
    return this.ajv.compile(schema);
  };
  
  removeSchema(schema) {
    return this.ajv.removeSchema(schema);
  };

}

module.exports = AjvValidator;
