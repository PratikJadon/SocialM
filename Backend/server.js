const express = require("express");
const cors = require("cors");
const { connectDB } = require("./helpers/connectDB");
const userRouter = require("./routes/user.routes.js");
const chatRouter = require("./routes/chat.routes.js");
const { connectCloudinary } = require("./helpers/cloudinary.js");
const errorHandler = require("./middleware/errorHandler.js");
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectCloudinary()

// Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)
app.use(errorHandler);


// app.options("/*", cors())

const start = async () => {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
};
start()