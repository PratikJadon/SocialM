const { StatusCodes } = require("http-status-codes")
const mongoose = require("mongoose")


exports.getChat = async (req, res) => {
    res.status(StatusCodes.OK).json({ message: "fine" })
}