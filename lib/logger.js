const { createLogger, transports, format, transport } = require("winston");
const { Console } = transports;
const { printf, combine, timestamp } = format;

const messageFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${timestamp} (${level}): ${message}`;
});

// Ignore log messages if they have { private: true }
const filterMessageType = format((info, opts) => {
  if (opts && opts.indexOf) {
    if (info.type && opts.indexOf(info.type) < 0) {
      return false;
    }
  }
  return info;
});

// Ignore log messages if they have { private: true }
const setLabel = format((info, label) => {
  info.label = label;
  return info;
});

const loggerFilters = ["match-body", "match-headers", "match-method", "match-query", "match-url"];

const initLogger = ({ config, filters, appLabel }) => {

  let customFilters = loggerFilters;
  if(Array.isArray(filters)){
      customFilters = filters;
  }

  const intialConfig = {
    format: combine(
    setLabel(appLabel),
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
    filterMessageType(customFilters),
      messageFormat
    ),
    transports: [
      new Console({
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
  };
  
  return createLogger({
    ...intialConfig,
    ...config,
  });
};

module.exports.initLogger = initLogger;
