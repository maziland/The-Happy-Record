const socketIO = require('socket.io');
const logger = require("../utils/logger")
let io;

function init(server) {
    io = socketIO(server);

    io.on('connection', (socket) => {
        logger.info('A user connected to WS');

        socket.on('disconnect', () => {
            logger.info('A user disconnected to WS');
        });
    });
}

function getIO() {
    return io;
}

module.exports = {
    init,
    getIO,
};