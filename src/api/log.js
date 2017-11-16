var logger = require('logger');
logger.format = function (level, date, message) {
    return date.toUTCString().toString() + "; " + level + "; " + message;
};

module.exports = logger.createLogger();