const axios = require('axios');

const { filterCpf, filterData, filterName, filterScore } = require('../utils/filters');

const cpfList = [];

const INVALID_PAGE = 'Invalid page.';

const getCpfOnPage = async (page) => {
  const { data } = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/approvals/${page}`,
  });

  if (data !== INVALID_PAGE) cpfList.push(...filterCpf(data));

  return data;
};

const getCpfList = async () => {
  let page = 4670;

  let dataValid = true;

  while(dataValid) {
    const data = await getCpfOnPage(page);

    if (data === INVALID_PAGE) dataValid = false;
    
    page += 1
  }

  return cpfList;
}

const getCandidateByCpf = async (cpf) => {
  const response = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/candidate/${cpf}`,
  });

  const data = filterData(response);

  const name = filterName(data);
  const score = filterScore(data);

  return { name, score, CPF: cpf }
}

const getCandidates= async () => {
  const cpfList = await getCpfList();

  const candidates = await Promise.all(cpfList.map(getCandidateByCpf));

  return candidates;
}


module.exports = {
  getCandidates,
}