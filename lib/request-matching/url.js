const { url } = require(".");

const urlCheck = function (logger, request, req) {
  let urlMatch = false;

  if (
    request &&
    (request.url ||
      request.urlPattern ||
      request.urlPath ||
      request.urlPathPattern)
  ) {
    // URL checks
    if (request.url && request.url === req.originalUrl) {
      urlMatch = true;
    } else if (
      request.urlPattern &&
      new RegExp(request.urlPattern).test(req.originalUrl)
    ) {
      urlMatch = true;
    } else if (request.urlPath && request.urlPath === req.path) {
      urlMatch = true;
    } else if (
      request.urlPathPattern &&
      new RegExp(request.urlPathPattern).test(req.path)
    ) {
      urlMatch = true;
    }
    
    logger.log({
      level: "debug",
      type: "match-url",
      message: `Url matching:\nRequest =>\n${JSON.stringify(
        {
          originalUrl: req.originalUrl,
          path: req.path,
        },
        null,
        2
      )}\nMatching config =>\n${JSON.stringify(
        {
          url: request.url,
          urlPattern: request.urlPattern,
          urlPath: request.urlPath,
          urlPathPattern: request.urlPathPattern,
        },
        null,
        2
      )}\nMatched: ${urlMatch}`,
    });

  }
  return urlMatch;
};

module.exports = urlCheck;
