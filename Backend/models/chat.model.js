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
    },
    lastMessage: {
        type: String
    },
    unreadMessageCount: [{
        _id: false,
        membersId: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        },
        count: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true });


// Create the User Model
const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
