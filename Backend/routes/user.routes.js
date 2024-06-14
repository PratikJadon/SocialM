const express = require("express");
const { signUp, login } = require("../controller/user.controller.js")
const { upload } = require("../helpers/multer.js")

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), signUp)
userRouter.post("/login", login)

module.exports = userRouter;