// const { Candidate } = require('../models');

// const { getCandidates } = require('./getCandidates');

// const { cpfAlreadyExists } = require('../utils/validations');

// const populateCandidates = async () => {
//   const candidates = await getCandidates();

//   const candidatesDB = await Candidate.findAll();

//   candidates.forEach((candidate) => {
//     const { CPF } = candidate;

//     if (!cpfAlreadyExists(CPF, candidatesDB)) {
//       Candidate.create(candidate);
//     }
//   });
// };

// module.exports = {
//   populateCandidates,
// };