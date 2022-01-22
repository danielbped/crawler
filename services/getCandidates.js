const axios = require('axios');

const { filterCpf, filterData, filterName, filterScore } = require('../utils/filters');

const { cpfIsValid } = require('../utils/validations')

const getCpfList = async () => {
  const { data } = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/approvals/1`,
  });

  return filterCpf(data);
};

const getCandidateByCpf = async (cpf) => {
  const response = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/candidate/${cpf}`,
  });

  const data = filterData(response);

  const name = filterName(data);
  const score = filterScore(data);

  if (cpfIsValid(cpf)) return { name, score, CPF: cpf }
}

const getCandidates= async () => {
  const cpfList = await getCpfList();

  const candidates = await Promise.all(cpfList.map(getCandidateByCpf));

  return candidates.filter((candidate) => candidate !== undefined);
}


module.exports = {
  getCandidates,
}