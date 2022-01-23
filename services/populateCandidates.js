const { Candidate } = require('../models');

const { getCandidates } = require('./getCandidates');

const { cpfIsValid, cpfAlreadyExists } = require('../utils/validations');

const populateCandidates = async () => {
  const candidates = await getCandidates();

  const candidatesDB = await Candidate.findAll();

  candidates.forEach((candidate) => {
    if (!cpfAlreadyExists(candidate.CPF, candidatesDB)) {
      Candidate.create({ ...candidate, validCPF: cpfIsValid(candidate.CPF) });
    }
  });
};

module.exports = {
  populateCandidates,
};