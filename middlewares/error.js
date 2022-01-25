const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../utils/errorMessages');

const error = async (_err, _req, res, _next) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR)
    .json({ message: errorMessages.internalServerError });
};

module.exports = (app) => {
  app.use(error);
};