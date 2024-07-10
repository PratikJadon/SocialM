const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Message = require("../models/message.model")
const { customError } = require("../utils/customError");
const { getOtherMemeber } = require("../utils/chatUtils");

exports.getChat = async (req, res, next) => {
    const { chatId } = req.body;
    if (!chatId) return next(customError(StatusCodes.BAD_REQUEST, "INTERNAL SERVER ERROR!!"));

    const chat = await Chat.findOne({ _id: chatId }).select("members groupChat").lean();
    if (!chat) return next(customError(StatusCodes.BAD_REQUEST, "INTERNAL SERVER ERROR!!"));

    const chatMember = chat.members.filter(member => member != req.user.id);
    let chatDetail;
    if (!chat.groupChat) {
        let chatMemberDetail = await User.findById(chatMember).select("name avatar").lean()
        chatDetail = { avatar: chatMemberDetail.avatar, name: chatMemberDetail.name, chat: chat }
    }
    else {
        // Handle get Group Chat
    }
    return res.status(StatusCodes.OK).json({ message: "Successfull", chatDetail })
}

exports.createChat = async (req, res, next) => {
    const { member } = req.body;

    const ifChatAlreadyExists = await Chat.findOne({ groupChat: false, members: { $all: [member, req.user.id] } })
    if (ifChatAlreadyExists) return res.status(StatusCodes.OK).json({ message: "Chat already exists.", ifChatAlreadyExists })

    if (member === req.user.id) return next(customError(StatusCodes.BAD_REQUEST, "You are trying to message yourself."))
    const chat = await Chat.create({
        members: [member, req.user.id],
    })
    return res.status(StatusCodes.OK).json({ message: "Chat created successfully", chat })
}

exports.getAllChats = async (req, res, next) => {
    const chats = await Chat.find({ members: req.user.id }).populate("members", "name avatar").exec()

    const tranformedChat = chats.map(chat => {
        const otherMember = getOtherMemeber(chat.members, req.user.id)
        return {
            _id: chat._id,
            name: chat.groupChat ? chat.name : otherMember[0].name,
            profileImage: chat.groupChat ? chat.profileImage : otherMember[0].avatar,
            groupChat: chat.groupChat,
            lastMessage: chat.lastMessage,
            unreadMessageCount: chat.unreadMessageCount
        };
    })
    return res.status(StatusCodes.OK).json({ message: "Chat fetched successfully", chats: tranformedChat })
}

exports.getchatMessages = async (req, res, next) => {
    let { page } = req.body;
    page = page || 1;
    const { chatId } = req.body
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const messages = await Message.find({ chat_id: chatId }).select("sender_id sender_name attachments content createdAt")
            .sort({ createdAt: -1 })  // Sort by createdAt descending (latest first)
            .skip(skip)               // Skip (page - 1) * limit messages for pagination
            .limit(limit + 1);               // Limit to 10 messages per page

        const hasMoreMessages = messages.length > limit;
        if (hasMoreMessages) messages.pop()

        res.status(200).json({ message: "Successfull", messages, hasMoreMessages });
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.sendChatMessage = async (req, res, next) => {
    const { chatId, content } = req.body;
    const chatMembers = await Chat.findOne({ _id: chatId, groupChat: false }).select("members");
    const otherMembers = chatMembers.members.filter((member) => member !== req.user.id);
    await Message.create({ sender_id: req.user.id, content: content, chat_id: chatId, sender_name: req.user.name });
    return res.status(StatusCodes.OK).json({ message: 'Message sent Successfully', })
}