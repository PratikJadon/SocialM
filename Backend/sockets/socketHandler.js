const { Server } = require("socket.io");
const { customError } = require("../utils/customError");
const { StatusCodes } = require("http-status-codes");
const { validateToken } = require("../helpers/jwtHelper");
const { UserSocketMap, userAlreadyConnected, disconnectSocketById, getUserSocket } = require("./socketUtils");
const { NEW_MESSAGE, NEW_ATTACHMENT } = require("./socketEvents");
const { getOtherMemeber } = require("../utils/chatUtils")

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

    io.on("connection", (socket) => {
        console.log(`${socket.user.name} is connected, ${socket.id}`);
        if (!userAlreadyConnected(socket.user.id)) {
            UserSocketMap.set(socket.user.id, socket.id)
        } else {
            disconnectSocketById(io, UserSocketMap.get(socket.user.id))
            UserSocketMap.set(socket.user.id, socket.id)
            console.log(`${socket.user.name} is reconnected, ${socket.id}`);
        }

        socket.on(NEW_MESSAGE, (message) => {
            console.log(message);
            const otherMemebers = getOtherMemeber(message.members, socket.user.id)
            console.log(otherMemebers);
            const socketOtherMembers = getUserSocket(otherMemebers)
            console.log(socketOtherMembers, UserSocketMap);
            socketOtherMembers.forEach(socketId => {
                if (io.sockets.sockets.get(socketId)) {
                    console.log(`Emitting message to socket ID: ${socketId}`);
                    io.to(socketId).emit(NEW_MESSAGE, {
                        sender_id: socket.user.id,
                        content: message.content,
                        sender_name: message.sender_name,
                        createdAt: message.createdAt
                    });
                } else {
                    console.log(`Socket ID ${socketId} is not connected.`);
                }
            });
        })

        socket.on('disconnect', () => {
            console.log(`${socket.user.name} is disconnected, ${socket.id}`);
            UserSocketMap.delete(socket.user.id)
        });
    })
}


module.exports = socketHandler;