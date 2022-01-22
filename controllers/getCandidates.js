const statusCode = require('http-status-codes').StatusCodes;
const { getCandidates } = require('../services/getCandidates');

const { Candidate } = require('../models')

const { populateCandidates } = require('../services/populateCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    const candidates = await getCandidates();

    const candidatesDB = await Candidate.findAll();

    if (candidatesDB.length === 0) {
      await populateCandidates(candidates);
    }

    res.status(statusCode.OK).json(candidates);
  } catch (err) {
    next (err);
  }
}

module.exports = (router) => {
  router.get('/', getCandidatesController);
};