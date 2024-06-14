const { StatusCodes } = require("http-status-codes")

exports.res200 = (res, message) => {
    return res.status(StatusCodes.OK).json({ message: message })
}

exports.res500 = (res, message) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: message })
}

exports.res400 = (res, message) => {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: message })
}