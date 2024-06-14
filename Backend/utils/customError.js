const { StatusCodes } = require("http-status-codes")

exports.customError = (statusCode, message) => {
    statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    message = message || "Something went wrong";

    // Create a new Error object with the message
    const error = new Error(message);

    // Assign the statusCode property to the error object
    error.statusCode = statusCode;

    return error;
};