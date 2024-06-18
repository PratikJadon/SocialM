const express = require("express")
const { getChat, createChat, getAllChats, getchatMessages, sendChatMessage } = require("../controller/chat.controller.js");
const { authHandler } = require("../middleware/auth.js");
const chatRouter = express.Router()

chatRouter.use(authHandler)
chatRouter.post("/getchat", getChat);
chatRouter.post("/createchat", createChat);
chatRouter.get("/getallchats", getAllChats);
chatRouter.post("/getchatmessages", getchatMessages)
chatRouter.post("/sendchatmessage", sendChatMessage)

module.exports = chatRouter