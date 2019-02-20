const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`),
    format.colorize({ all: true })
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename:'logs/info.log', level:'info'}),
    new transports.File({filename:'logs/error.log', level:'error'}),
    new transports.File({filename:'logs/logs.log'}),
  ]
});

module.exports = logger;