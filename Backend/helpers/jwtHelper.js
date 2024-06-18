const jwt = require("jsonwebtoken");


const options = {
    expiresIn: process.env.JWT_EXPIRE || "1h"
};

exports.genToken = (payload) => {
    const secretKey = process.env.JWT_KEY
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

exports.validateToken = (token) => {
    const secretKey = process.env.JWT_KEY
    const decoded = jwt.decode(token, secretKey)
    return decoded;
}