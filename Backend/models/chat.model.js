const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    groupChat: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }],
    profileImage: {
        type: String
    }
}, { timestamps: true });


// Create the User Model
const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
