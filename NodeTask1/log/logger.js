const winston = require('winston');

function tsFormat() {
    return (new Date()).toLocaleTimeString();
}

let env = process.env.NODE_ENV || 'development',
    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          timestamp: tsFormat,
          colorize: true,
          level: 'info'
        }),
        new (winston.transports.File)({
          filename: 'log/results.log',
          timestamp: tsFormat,
          level: env === 'development' ? 'debug' : 'info'
        })
      ]
    });

module.exports = logger;
