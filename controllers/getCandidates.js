const statusCode = require('http-status-codes').StatusCodes;

const { Candidate } = require('../models')

const { getCandidates } = require('../services/getCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    await getCandidates();
    
    const candidatesDB = await Candidate.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(statusCode.OK).json(candidatesDB);
  } catch (err) {
    next (err);
  }
}

module.exports = (router) => {
  router.get('/', getCandidatesController);
};