const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String
    },
    bio: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    }
}, { timestamps: true });

// Add pre-save middleware to update the updatedAt field
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    this.updatedAt = Date.now();
    next();
});

userSchema.methods.verifyPassowrd = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
