const { getUserSocket } = require("./socketUtils");
const { NEW_MESSAGE, NEW_ATTACHMENT, NEW_MESSAGE_ALERT } = require("./socketEvents");
const { getOtherMemeber } = require("../utils/chatUtils");
const { sendMessageToKafka } = require("../kafka/kafkaHandler");

const handleNewMessage = (io, socket) => {
    return async (message) => {
        const otherMemebers = getOtherMemeber(message.members, socket.user.id)
        const socketOtherMembers = getUserSocket(otherMemebers)
        for (const { socketId, id } of socketOtherMembers) {
            const newMessage = {
                sender_id: socket.user.id,
                content: message.content,
                sender_name: message.sender_name,
                createdAt: message.createdAt,
                chatId: message.chatId
            };
            if (io.sockets.sockets.get(socketId)) {
                console.log(`Emitting message to socket ID: ${socketId}`);
                const newMessageAlert = {
                    chatId: message.chatId,
                    lastMessage: message.content
                }
                io.to(socketId).emit(NEW_MESSAGE, newMessage);
                io.to(socketId).emit(NEW_MESSAGE_ALERT, newMessageAlert)
            } else {
                await sendMessageToKafka(NEW_MESSAGE_ALERT, { clear: false, chatId: message.chatId, userId: id })
                console.log(`Socket ID ${socketId} is not connected.`);
            }
            try {
                await sendMessageToKafka(NEW_MESSAGE, newMessage);
            } catch (error) {
                console.error(`Error sending message to Kafka for socket ID ${socketId}:`, error);
            }
        }
    }
}

const handleNewMessageAlert = (io, socket) => {
    return async ({ currentChatId, messageAlert, clear }) => {
        if (clear) {
            return await sendMessageToKafka(NEW_MESSAGE_ALERT, { clear, currentChatId, userId: socket.user.id })
        }
        if (currentChatId !== messageAlert.chatId) {
            messageAlert = { ...messageAlert, userId: socket.user.id, clear }
            await sendMessageToKafka(NEW_MESSAGE_ALERT, messageAlert)
        }
    }
}

module.exports = {
    handleNewMessage,
    handleNewMessageAlert
};