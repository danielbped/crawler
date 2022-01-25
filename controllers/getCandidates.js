const statusCode = require('http-status-codes').StatusCodes;

const { Candidate } = require('../models')

const io = require('../socket/io');

// const { populateCandidates } = require('../services/populateCandidates');
const { getCandidateList } = require('../services/getCandidates');

const getCandidatesController = async (_req, res, next) => {
  try {
    // await populateCandidates();
    await getCandidateList();
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