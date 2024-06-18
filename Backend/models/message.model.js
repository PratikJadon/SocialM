const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat_id: {
        type: mongoose.Schema.ObjectId,
        ref: "chat"
    },
    sender_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    sender_name: {
        type: String
    },
    content: {
        type: String
    },
    attachments: [{
        filename: {
            type: String
        },
        url: {
            type: String
        },
        _id: false // Disable _id for subdocuments
    }]
}, { timestamps: true });


// Create the User Model
const Message = mongoose.model('message', messageSchema);

module.exports = Message;
