const statusCode = require('http-status-codes').StatusCodes;
const { getCandidates } = require('../services/getCandidates');

const { Candidate } = require('../models')

const { populateCandidates } = require('../services/populateCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    const candidates = await getCandidates();

    await populateCandidates(candidates);
    
    const candidatesDB = await Candidate.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    
    res.status(statusCode.OK).json(candidatesDB);
  } catch (err) {
    next (err);
  }
}

module.exports = (router) => {
  router.get('/', getCandidatesController);
};