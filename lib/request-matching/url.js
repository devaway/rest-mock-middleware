const urlCheck = function(request, req) {
  let urlMatch = false;
  if (request) {
    // URL checks
    if (request.url && request.url === req.originalUrl) {
      urlMatch = true;
    } else if (request.urlPattern && new RegExp(request.urlPattern).test(req.originalUrl)) {
      urlMatch = true;
    } else if (request.urlPath && request.urlPath === req.path) {
      urlMatch = true;
    } else if (request.urlPathPattern && new RegExp(request.urlPathPattern).test(req.path)) {
      urlMatch = true;
    }
  }
  return urlMatch;
}

module.exports = urlCheck;