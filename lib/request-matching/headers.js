const headersCheck = function (request, req) {
  let headersMatch = true;
  if (request.headers) {
    Object.getOwnPropertyNames(request.headers).forEach((name) => {
      let mappingHeader = request.headers[name];
      let requestHeader = req.get(name);
      if (!requestHeader) {
        headersMatch = false;
      } else if (
        mappingHeader &&
        mappingHeader.toLowerCase() != requestHeader.toLowerCase()
      ) {
        headersMatch = false;
      }
    });

    logger.log({
      level: "debug",
      type: "match-headers",
      message: `Header matching:\nRequest =>\n${JSON.stringify(
        {
          headers: req.headers,
        },
        null,
        2
      )}\nMatching config =>\n${JSON.stringify(
        {
          headers: request.headers,
        },
        null,
        2
      )}\nMatched: ${headersMatch}`,
    });
  }

  return headersMatch;
};

module.exports = headersCheck;
