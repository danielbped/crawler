const { Candidate } = require('../models');

const { cpfAlreadyExists } = require('../utils/validations');

const populateCandidates = async (candidates) => {
  const candidatesDB = await Candidate.findAll();

  candidates.forEach((candidate) => {
    const { CPF } = candidate;

    if (!cpfAlreadyExists(CPF, candidatesDB)) {
      Candidate.create(candidate);
    }
  });
};

module.exports = {
  populateCandidates,
};