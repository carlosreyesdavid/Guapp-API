var winston = require('winston'),
    date = new Date(),
    stringDate = date.toLocaleDateString().split('/').join('-')

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({ filename: './log/log-' + stringDate +'.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;