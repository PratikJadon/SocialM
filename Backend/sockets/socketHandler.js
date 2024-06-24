const { Server } = require("socket.io");
const { customError } = require("../utils/customError");
const { StatusCodes } = require("http-status-codes");
const { validateToken } = require("../helpers/jwtHelper");
const { UserSocketMap, userAlreadyConnected, disconnectSocketById, getUserSocket } = require("./socketUtils");
const { NEW_MESSAGE, NEW_ATTACHMENT, NEW_MESSAGE_ALERT } = require("./socketEvents");
const { getOtherMemeber } = require("../utils/chatUtils");
const { sendMessageToKafka } = require("../kafka/kafkaHandler");
const { consumerRun } = require("../kafka/kafka.controller");
const { handleNewMessage, handleNewMessageAlert } = require("./socket.controller");

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(customError(StatusCodes.UNAUTHORIZED, "Please login to access."));
        }

        try {
            socket.user = validateToken(token)
            next();
        } catch (error) {
            return next(customError(StatusCodes.UNAUTHORIZED, "Please login to access."));
        }
    })

    io.on("connection", async (socket) => {
        console.log(`${socket.user.name} is connected, ${socket.id}`);
        if (!userAlreadyConnected(socket.user.id)) {
            UserSocketMap.set(socket.user.id, socket.id)
        } else {
            disconnectSocketById(io, UserSocketMap.get(socket.user.id))
            UserSocketMap.set(socket.user.id, socket.id)
            console.log(`${socket.user.name} is reconnected, ${socket.id}`);
        }
        await consumerRun([NEW_MESSAGE, NEW_MESSAGE_ALERT]);

        socket.on(NEW_MESSAGE, handleNewMessage(io, socket))
        socket.on(NEW_MESSAGE_ALERT, handleNewMessageAlert(io, socket))

        socket.on('disconnect', () => {
            console.log(`${socket.user.name} is disconnected, ${socket.id}`);
            UserSocketMap.delete(socket.user.id)
        });
    })
}


module.exports = socketHandler;