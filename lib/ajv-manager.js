const ajv = require('ajv');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const walkSyncJson = require('./walk-sync-json');

class AjvValidator {
  constructor(schemaDirectory, logger) {
    this.ajv = ajv({ allErrors: true, schemaId: 'auto' });
    this.schemas = new Map();
    this.logger = logger;

    if (
      fs.existsSync(schemaDirectory) &&
      fs.statSync(schemaDirectory).isDirectory()
    ) {
      let mappingFiles = walkSyncJson(schemaDirectory);
      mappingFiles.forEach((file) => {
        let filename = path.normalize(file).replace(schemaDirectory, '');
        try {
          const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
          this.schemas.set(path.normalize(filename), schema);
          this.ajv.addSchema(schema);
          logger.log({
            level: 'debug',
            message: `Schema "${filename}" loaded.`,
          });
        } catch (e) {
          logger.log({
            level: 'error',
            message: `ERROR: invalid schema from: ${filename}`,
          });
        }
      });

      chokidar
        .watch(schemaDirectory, {
          ignoreInitial: true,
        })
        .on('change', (filePath) => {
          let filename = path.basename(filePath);
          if (
            filename &&
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isFile()
          ) {
            logger.log({
              level: 'info',
              message: `Realoading: ${filename}`,
            });
            try {
              const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              if (this.schemas.has(filename)) {
                this.ajv.removeSchema(schema);
              }
              this.schemas.set(filename, schema);
              this.ajv.addSchema(schema);
            } catch (e) {
              logger.log({
                level: 'error',
                message: `invalid schema from: ${filename} ${e}`,
              });
            }
          } else {
            logger.log({
              level: 'error',
              message: 'filename not provided',
            });
          }
        });
    }
  }

  validate(fileName, body) {
    if (this.schemas.has(fileName)) {
      const schema = this.schemas.get(fileName);
      let id = schema.$id || schema.id;
      const validator = this.ajv.getSchema(id);
      const validated = validator(body);
      return { validated, errors: validator.errors };
    }
    return {
      validated: false,
      errors: `Schema not found: ${fileName}`,
    };
  }

  compile(schema) {
    return this.ajv.compile(schema);
  }

  removeSchema(schema) {
    return this.ajv.removeSchema(schema);
  }
}

module.exports = AjvValidator;
