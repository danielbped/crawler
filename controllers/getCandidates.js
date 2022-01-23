const statusCode = require('http-status-codes').StatusCodes;
const { getCandidates } = require('../services/getCandidates');

const { Candidate } = require('../models')

const { populateCandidates } = require('../services/populateCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    const candidates = await getCandidates();

    await populateCandidates(candidates);
    
    const candidatesDB = await Candidate.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (candidatesDB.length === 0) {
      return res.status(statusCode.RESET_CONTENT)
        .json({ message: 'Please refresh the page' })
    }

    res.status(statusCode.OK).json(candidatesDB);
  } catch (err) {
    next (err);
  }
}

module.exports = (router) => {
  router.get('/', getCandidatesController);
};