const headersCheck = function(request, req) {
  let headersMatch = true;
  if (request.headers) {
    Object.getOwnPropertyNames(request.headers).forEach((name) => {
      let mappingHeader = request.headers[name];
      let requestHeader = req.get(name);
      if (!requestHeader) {
        headersMatch = false;
      } else if (mappingHeader && mappingHeader.toLowerCase() != requestHeader.toLowerCase()) {
        headersMatch = false;
      }
    });
  }
  return headersMatch;
}

module.exports = headersCheck;