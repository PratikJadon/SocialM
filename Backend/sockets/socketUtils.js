exports.UserSocketMap = new Map()

exports.userAlreadyConnected = (user) => {
    return this.UserSocketMap.get(user)
}

exports.disconnectSocketById = (io, socketId) => {
    const socket = io.sockets.sockets.get(socketId);
    if (socket) {
        socket.disconnect();
        console.log(`Socket with id ${socketId} has been disconnected`);
    } else {
        console.log(`No socket found with id ${socketId}`);
    }
}

exports.getUserSocket = (users = []) => {
    return users.map(user => ({ id: user, socketId: this.UserSocketMap.get(user) }))
}