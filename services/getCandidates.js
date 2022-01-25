const axios = require('axios');

require('dotenv').config();

const {
  filterCpf,
  filterData,
  filterName,
  filterScore,
  removeSpecialCpf,
} = require('../utils/filters');

const { cpfIsValid } = require('../utils/validations');
const { populateCandidates } = require('./populateCandidates');

let PAGE = process.env.PAGE || 1;
const INVALID_PAGE = 'Invalid page.';

const getCandidates = async () => {
  while(true) {
    const data = await getCpfOnPage(PAGE);

    if (!data) break;

    const candidates = await Promise.all(data.map(getCandidateByCpf));

    populateCandidates(candidates);

    PAGE += 1
  }
}

const getCpfOnPage = async (PAGE) => {
  const { data } = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/approvals/${PAGE}`,
  });

  if (data !== INVALID_PAGE) return filterCpf(data);
};

const getCandidateFiltered = (data, cpf) => {
  const name = filterName(data);
  const score = filterScore(data);

  const CPF = removeSpecialCpf(cpf);

  const validCPF = cpfIsValid(CPF);

  return { name, score, CPF, validCPF };
}

const getCandidateByCpf = async (cpf) => {
  const response = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/candidate/${cpf}`,
  });

  const data = await filterData(response);

  return getCandidateFiltered(data, cpf);
}

module.exports = {
  getCandidates,
  getCpfOnPage,
  getCandidateByCpf,
  getCandidateFiltered,
}