const { Candidate } = require('../models');

const { getCandidates } = require('./getCandidates');

const { cpfIsValid } = require('../utils/validations');

const populateCandidates = async () => {
  const candidates = await getCandidates();

  candidates.forEach((candidate) => {
    Candidate.create({ ...candidate, validCPF: cpfIsValid(candidate.CPF) })
  })
}

module.exports = {
  populateCandidates,
};