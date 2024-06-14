const { validateToken } = require("../helpers/jwtHelper");

exports.authHandler = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const decoded = validateToken(token);
    if (decoded) req.user = decoded;
}