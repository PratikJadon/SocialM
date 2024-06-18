const express = require("express");
const { signUp, login, searchUser } = require("../controller/user.controller.js")
const { upload } = require("../helpers/multer.js");
const { authHandler } = require("../middleware/auth.js");

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), signUp)
userRouter.post("/login", login)
userRouter.post("/searchuser", authHandler, searchUser)

module.exports = userRouter;