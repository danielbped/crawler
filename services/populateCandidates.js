const { Candidate } = require('../models');

const { getCandidates } = require('./getCandidates');

const { cpfIsValid, cpfAlreadyExists } = require('../utils/validations');

const { removeSpecialCpf } = require('../utils/filters');

const populateCandidates = async () => {
  const candidates = await getCandidates();

  const candidatesDB = await Candidate.findAll();

  candidates.forEach((candidate) => {
    const CPF = removeSpecialCpf(candidate.CPF);
    
    if (!cpfAlreadyExists(CPF, candidatesDB)) {
      Candidate.create({ ...candidate, CPF, validCPF: cpfIsValid(candidate.CPF) });
    }
  });
};

module.exports = {
  populateCandidates,
};