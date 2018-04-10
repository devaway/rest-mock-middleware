const fs = require('fs');
var path = require('path');

const mockIdentifier = "[Mock]";

const walkSyncJson = function(dir) {
  let newFileList = [];
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
  files.forEach(function(file) {
    let stat = fs.statSync(dir + file);
    if (stat.isDirectory()) {
      newFileList = newFileList.concat(walkSyncJson(dir + file + '/'));
    } else {
      if (stat.isFile() && path.extname(dir + file).toLowerCase() === ".json") {
        newFileList.push(path.normalize(dir + file));
      }
    }
  });
  return newFileList;
};

const sortMappings = (mappings) => {
  let sortedMappings = new Map([...mappings.entries()].sort((a, b) => {
    let order = -1;
    if (a[1].request && a[1].request.priority && b[1].request && b[1].request.priority) {
      order = a[1].request.priority - b[1].request.priority;
    } else if (b[1].request && b[1].request.priority) {
      order = 1;
    }
    return order;
  }));
  return sortedMappings;
}

const mocksMiddleware = function(mocksConfiguration) {

  // Check if the server is correctly configured. If the errors are bloking the server will stops with errors.
  // If the erros are non blocking then the server will start like a passthrough.
  if (mocksConfiguration === undefined || mocksConfiguration.disabled === true) {
    console.log(mockIdentifier + " Mock middleware not configured, passthrough enabled.") // eslint-disable-line no-console
    // return passthrough
    return function(req, res, next) {
      next();
    };
  }
  // chek is the directory attribute is configured.
  if (mocksConfiguration && mocksConfiguration.root_dir === undefined) {
    throw new Error(mockIdentifier + " Mock middleware directory is not configured.");
  }
  // check is the directory exists
  if (mocksConfiguration && mocksConfiguration.root_dir) {
    let directory = path.resolve(__dirname, mocksConfiguration.root_dir);
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
      throw new Error(mockIdentifier + " Mock middleware directory doesn't exists.");
    }
  }

  // check is the mappings directory exists
  if (mocksConfiguration && mocksConfiguration.root_dir) {
    let directory = path.resolve(__dirname, mocksConfiguration.root_dir + "/mappings");
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
      throw new Error(mockIdentifier + " Mock middleware mappings directory doesn't exists.");
    }
  }

  let watchDirectory = path.normalize(path.resolve(__dirname, mocksConfiguration.root_dir + "/mappings") + "/");
  let mappingFiles = walkSyncJson(watchDirectory);
  let mappings = new Map();
  mappingFiles.forEach((file) => {
    let filename = path.normalize(file).replace(watchDirectory, "");
    try {
      mappings.set(path.normalize(filename), JSON.parse(fs.readFileSync(file, 'utf8')));
    } catch (e) {
      console.log(mockIdentifier + " ERROR: invalid json from: " + filename); // eslint-disable-line no-console
    }
  });

  mappings = sortMappings(mappings);

  fs.watch(watchDirectory, { recursive: true }, (eventType, filename) => {
    let filePath = path.normalize(watchDirectory + filename);
    if (filename && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      console.log('Realoading: ' + filename); // eslint-disable-line no-console
      try {
        mappings.set(path.normalize(filename), JSON.parse(fs.readFileSync(filePath, 'utf8')));
        mappings = sortMappings(mappings);
      } catch (e) {
        console.log(mockIdentifier + " ERROR: invalid json from: " + filename); // eslint-disable-line no-console
      }
    } else {
      console.log('filename not provided'); // eslint-disable-line no-console
    }
  });

  console.log(mockIdentifier + " Mock middleware started correctly."); // eslint-disable-line no-console
  // Return mock middleware
  return function(req, res, next) {
    // eslint-disable-next-line array-callback-return, consistent-return
    let route = Array.from(mappings.values()).find((route) => {
      let urlMatch = false;
      let methodMatch = false;
      let headersMatch = false;
      let paramsMatch = false;
      if (route.request) {
        // URL checks
        if (route.request.url && route.request.url === req.originalUrl) {
          urlMatch = true;
        } else if (route.request.urlPattern && new RegExp(route.request.urlPattern).test(req.originalUrl)) {
          urlMatch = true;
        } else if (route.request.urlPath && route.request.urlPath === req.path) {
          urlMatch = true;
        } else if (route.request.urlPathPattern && new RegExp(route.request.urlPathPattern).test(req.path)) {
          urlMatch = true;
        }
        // METHOD checks
        if (!route.request.method || route.request.method.toUpperCase() === "ANY" || route.request.method.toUpperCase() === req.method) {
          methodMatch = true;
        }
        // HEADERS checks
        if (route.request.headers) {
          headersMatch = true;
          Object.getOwnPropertyNames(route.request.headers).forEach((name) => {
            if (route.request.headers[name] && req.get(name) && route.request.headers[name].toLowerCase() != req.get(name).toLowerCase()) {
              headersMatch = false;
            }
          });
        } else {
          headersMatch = true;
        }

        // HEADERS checks
        if (route.request.queryParameters) {
          paramsMatch = true;
          Object.getOwnPropertyNames(route.request.queryParameters).forEach((name) => {
            if (route.request.queryParameters[name] != req.query[name]) {
              paramsMatch = false;
            }
          });
        } else {
          paramsMatch = true;
        }
      }
      return urlMatch && methodMatch && headersMatch && paramsMatch;
    });
    if (route) {
      res.set('Content-Type', 'application/json');
      if (route.response.headers) {
        res.set(route.response.headers);
      }
      if (route.response.status) {
        res.status(route.response.status);
      }
      let body = null,
        flagError = false;
      if (route.response.bodyFileName) {
        try {
          let filePath = path.normalize(path.resolve(__dirname, mocksConfiguration.root_dir + "/__files/" + route.response.bodyFileName));
          body = fs.readFileSync(filePath, 'utf8');
        } catch (e) {
          res.status(404);
          res.set('Content-Type', 'text/plain');
          body = mockIdentifier + "ERROR: file not found: " + route.response.bodyFileName;
          body += '\n' + e.message;
          flagError = true;
        }
        if (flagError === false) {
          try {
            body = JSON.parse(body);
          } catch (e) {
            res.status(500);
            res.set('Content-Type', 'text/plain');
            body = mockIdentifier + "ERROR: invalid json from: " + route.response.bodyFileName;
            body += '\n' + e.message;
          }
        }
        res.send(body);

      } else if (route.response.jsonBody) {
        body = route.response.jsonBody;
        try {
          body = JSON.parse(body);
        } catch (e) {
          res.status(500);
          res.set('Content-Type', 'text/plain');
          body = mockIdentifier + "ERROR: invalid json from: " + route.response.bodyFileName;
          body += '\n' + e.message;
        }
        res.send(body);
      }
      console.log(mockIdentifier + " " + req.method + " " + req.originalUrl + " -> "); // eslint-disable-line no-console
      // eslint-disable-next-line no-console
      console.log(JSON.stringify({
        "status": res.statusCode + " ( " + res.statusMessage + " ) ",
        "headers": res.getHeaders(),
        "body": body
      }, null, 2));
    } else {
      next();
    }
  }
}

module.exports = mocksMiddleware;
