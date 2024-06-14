const cloudinary = require("cloudinary")

exports.connectCloudinary = () => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
        api_key: process.env.CLOUDINARY_CLIENT_API,
        api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
    });
    console.log("Cloudinary Connected");
}