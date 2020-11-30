const methodcheck = function(request, req) {
  let methodMatch = false;
  if (!request.method || request.method.toUpperCase() === "ANY" || request.method.toUpperCase() === req.method) {
    methodMatch = true;
  }
    
  logger.log({
    level: "debug",
    type: "match-method",
    message: `Method matching:\nRequest =>\n${JSON.stringify(
      {
        method: req.method,
      },
      null,
      2
    )}\nMatching config =>\n${JSON.stringify(
      {
        method: request.method,
      },
      null,
      2
    )}\nMatched: ${methodMatch}`,
  });

  return methodMatch;
}

module.exports = methodcheck;