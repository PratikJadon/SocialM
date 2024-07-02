const { StatusCodes } = require("http-status-codes")
const { genToken, validateToken } = require("../helpers/jwtHelper.js")
const User = require("../models/user.model.js")
const { customError } = require("../utils/customError.js")
const { res400, res500 } = require("../utils/resCodes.js")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

exports.signUp = async (req, res, next) => {
    try {
        const { name, username, email, password, bio } = req.body;
        if (!req.file) {
            return res400(res, "No profile Image found.")
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: req.file.filename.split('.')[0]
        });

        if (!result) next(Error("Image not uploading...."))

        const newUser = new User({
            name,
            username,
            email,
            password,
            bio,
            avatar: result.secure_url,
        });

        await newUser.save();

        // Remove file from disk after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'SignUp successfully',
        });

    } catch (error) {
        // Handle error and delete uploaded image from Cloudinary if exists
        if (req.file && req.file.path) {
            try {
                // Get public_id from uploaded image (if exists)
                const publicId = req.file.filename.split('.')[0]; // Example: If filename is 'image.jpg', public_id would be 'image'

                // Delete image from Cloudinary using public_id
                await cloudinary.uploader.destroy(publicId);
                fs.unlinkSync(req.file.path);
                console.log('Deleted image from Cloudinary:', publicId);
            } catch (deleteError) {
                console.error('Error deleting image from Cloudinary:', deleteError);
            }
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return next(customError(StatusCodes.BAD_REQUEST, "Please provide username and password"))

    const user = await User.findOne({ username }).select("+password");
    if (!user) return next(customError(StatusCodes.UNAUTHORIZED, "Please provide correct email or password"))

    const isValidPassword = await user.verifyPassowrd(password)
    if (!isValidPassword) return next(customError(StatusCodes.UNAUTHORIZED, "Please provide correct email or password"))

    const token = genToken({ name: user.name, email: user.email, username: user.username, id: user._id })
    res.status(StatusCodes.OK).json({
        message: "Login successfull",
        user: {
            name: user.name,
            email: user.email,
            username: user.username,
            user_id: user._id,
            token
        }
    })

}

exports.searchUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        if (!username) return next(customError(StatusCodes.BAD_REQUEST, "Please give user to search"))

        const regex = new RegExp(username, 'i'); // 'i' makes it case-insensitive
        let foundUser = await User.find({ username: { $regex: regex, $ne: req.user.username } }).select("name avatar _id");
        foundUser = foundUser.filter(user => user._id !== req.user.id)
        res.status(StatusCodes.OK).json({ message: "Success", foundUser })
    } catch (error) {
        next(error)
    }
}

exports.reAuth = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) next(customError(StatusCodes.UNAUTHORIZED, "Please login to access."))

        const user = validateToken(token)
        if (!user) next(customError(StatusCodes.UNAUTHORIZED, "Please login to access."))
        return res.status(StatusCodes.OK).json({
            message: "User is authenticated", user: {
                name: user.name,
                email: user.email,
                username: user.username,
                user_id: user.id,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}