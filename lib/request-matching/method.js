const methodcheck = function(request, req) {
  let methodMatch = false;
  if (!request.method || request.method.toUpperCase() === "ANY" || request.method.toUpperCase() === req.method) {
    methodMatch = true;
  }
  return methodMatch;
}

module.exports = methodcheck;