const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const { NEW_MESSAGE, NEW_MESSAGE_ALERT } = require("../sockets/socketEvents");
const { kafka } = require("./kafkaHandler");

let consumer = null;

exports.consumerRun = async (topics) => {
    if (consumer) return consumer;
    consumer = kafka.consumer({ groupId: "default" })

    await consumer.connect()
    await Promise.all(
        topics.map(async (topic) => {
            await consumer.subscribe({
                topic,
                fromBeginning: true,  // Start consuming from the beginning of the topic
            });
        })
    );

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message, pause }) => {
            try {
                const msg = JSON.parse(message.value?.toString());
                switch (topic) {
                    case NEW_MESSAGE:
                        consumeNewMessage(msg)
                        break;

                    case NEW_MESSAGE_ALERT:
                        consumeMessageAlert(msg)
                        break;

                    default:
                        console.warn(`Unhandled topic: ${topic}`);
                }
            } catch (error) {
                pause();
                setTimeout(() => {
                    consumer.resume()
                }, process.env.CONSUMER_RESUME)
            }
        },
    });
};

const consumeNewMessage = async (msg) => {
    try {
        await Message.create({ chat_id: msg.chatId, content: msg.content, sender_id: msg.sender_id, sender_name: msg.sender_name })
        console.log(`Message is send to DB.`);
        await Chat.findByIdAndUpdate(msg.chatId, { lastMessage: msg.content })
    } catch (error) {
        console.log(error);
    }
}

const consumeMessageAlert = async (msg) => {
    try {
        console.log(msg);
        const chat = await Chat.findById(msg.chatId || msg.currentChatId);
        let updatedUnreadMessageCount;
        if (msg.clear) {
            updatedUnreadMessageCount = chat.unreadMessageCount.filter(msgCount => !msgCount.membersId.equals(msg.userId))
        } else {
            updatedUnreadMessageCount = chat.unreadMessageCount.map(msgCount => {
                if (msgCount.membersId.equals(msg.userId)) {
                    msgCount.count += 1;
                }
                return msgCount;
            });
            if (!updatedUnreadMessageCount || updatedUnreadMessageCount.length <= 0) {
                updatedUnreadMessageCount.push({
                    membersId: msg.userId,
                    count: 1
                })
            }
        }
        chat.unreadMessageCount = updatedUnreadMessageCount;
        await chat.save();

        console.log("Last Message and count updated..");

    } catch (error) {
        console.log(error);
    }
}