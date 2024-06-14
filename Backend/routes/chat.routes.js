const express = require("express")
const { getChat } = require("../controller/chat.controller.js")
const chatRouter = express.Router()

chatRouter.get("/myChat", getChat)

module.exports = chatRouter