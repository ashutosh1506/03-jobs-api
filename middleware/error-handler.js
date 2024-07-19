const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statuscode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
