const jwt = require("jsonwebtoken");


const options = {
    expiresIn: process.env.JWT_EXPIRE || "1h"
};

exports.genToken = (payload) => {
    const secretKey = process.env.JWT_KEY
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

exports.validateToken = (toke) => {
    const secretKey = process.env.JWT_KEY
    const decoded = jwt.decode(token, secretKey)
}