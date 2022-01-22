const statusCode = require('http-status-codes').StatusCodes;
const { getCandidates } = require('../services/getCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    const candidates = await getCandidates();

    res.status(statusCode.OK).json(candidates);
  } catch (err) {
    next (err);
  }
}

module.exports = (router) => {
  router.get('/', getCandidatesController);
};