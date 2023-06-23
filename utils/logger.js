const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
    level: 'info', // Set the desired log level
    format: winston.format.simple(), // Set the log format
    transports: [
        new winston.transports.Console() // Output logs to the console
        // Add additional transports as needed, e.g., File, HTTP, etc.
    ]
});

module.exports = logger;