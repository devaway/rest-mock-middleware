const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const walkSyncJson = require('./walk-sync-json');
const sortMappings = require('./mappings-sort');
const requestMachings = require('./request-matching/index');

const mockIdentifier = "[Mock]";

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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

  fs.watch(watchDirectory, {
    recursive: true
  }, (eventType, filename) => {
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
  let parser = bodyParser.json();
  return function(req, res, next) {
    return parser(req, res, function(err) {
      if (err) return next(err);
      // eslint-disable-next-line array-callback-return, consistent-return
      let route = Array.from(mappings.values()).find((route) => {
        let routeMatch = true;
        // URL checks
        routeMatch = requestMachings.url(route.request, req);
        if (routeMatch) {
          // METHOD checks
          routeMatch &= requestMachings.method(route.request, req);
        }
        if (routeMatch) {
          // HEADERS checks
          routeMatch &= requestMachings.headers(route.request, req);
        }
        if (routeMatch) {
          // Query Parameters checks
          routeMatch &= requestMachings.queryParameters(route.request, req);
        }
        if (routeMatch) {
          // Body checks
          routeMatch &= requestMachings.body(route.request, req, res, mockIdentifier);
        }

        return routeMatch;
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
        if (flagError === false && route.response.bodyFileName) {
          try {
            let filePath = path.normalize(path.resolve(__dirname, mocksConfiguration.root_dir + "/responses/" + route.response.bodyFileName));
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
          if(route.delay && isNumber(route.delay) && route.delay > 0){
              setTimeout(function onDelayingResponse(){
                res.send(body);
              }, parseInt(route.delay, 10));
          }else{
              res.send(body);
          }
        } else if (route.response.jsonBody) {
          body = route.response.jsonBody;
          if(route.delay && isNumber(route.delay) && route.delay > 0){
              setTimeout(function onDelayingResponse(){
                res.send(body);
              }, parseInt(route.delay, 10));
          }else{
              res.send(body);
          }
        }
        console.log(mockIdentifier + " " + req.method + " " + req.originalUrl + " -> "); // eslint-disable-line no-console
        // eslint-disable-next-line no-console
        console.log(JSON.stringify({
          "status": res.statusCode + " ( " + res.statusMessage + " ) ",
          "headers": res.headers,
          "body": body
        }, null, 2));
      } else {
        next();
      }
    });
  }
}

module.exports = mocksMiddleware;