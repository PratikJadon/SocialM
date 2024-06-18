const { StatusCodes } = require("http-status-codes");
const { validateToken } = require("../helpers/jwtHelper");
const { customError } = require("../utils/customError");

exports.authHandler = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    token = token.split(" ")[1];
    const decoded = validateToken(token);
    if (!decoded) return next(customError(StatusCodes.UNAUTHORIZED, "Please login to access these resources."))
    req.user = decoded
    next();
}