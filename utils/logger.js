const { createLogger, format, transports, addColors } = require('winston');

addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green'
});

const formatParams = (info) => {
    const {
        level, message, ...args
    } = info;

    return `${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, '', '')
        : ''}`;
};
const Format = format.combine(
    format.colorize(),
    format.align(),
    format.printf(formatParams),

);
// Create a Winston logger instance
const logger = createLogger({
    level: 'debug', // Set the desired log level
    format: Format, // Set the log format
    transports: [
        new transports.Console()]
});

module.exports = logger;