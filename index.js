const axios = require('axios');

const CPF_REGEX = />(\d{3}\.?){3}-\d{2}/gm;

const CANDIDATE_REGEX = /<html>(\s.+\s)*<\/html>/gm;

const NAME_REGEX = /Name:<\/b>.*</gmi;

const SCORE_REGEX = /Score:<\/b>\s\d{2}\.\d{1,2}/gm;

const filterData = ({ data }) => data.match(CANDIDATE_REGEX);
const filterName = (data) => data[0].match(NAME_REGEX)[0].split(' ').slice(1).join(' ').slice(0, -1)
const filterScore = (data) => data[0].match(SCORE_REGEX)[0].split(' ').slice(1)[0]
const filterCpf = (cpf) => cpf.split('').splice(1).join('')

const cpfIsValid = (cpf) => {
  const validation = cpf.split('')
  .map((num) => parseInt(num))
  .filter((num) => !isNaN(num))
  .reduce((acc, curr) => acc + curr)
  .toString().split('');
  
  if (validation[0] !== validation[1]) return false;
  
  return true;
}

const getCpfList = async () => {
  const { data } = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/approvals/1`,
  });

  return data.match(CPF_REGEX).map(filterCpf);
};

const getCandidateByCpf = async (cpf) => {
  const response = await axios({
    method: 'GET',
    url: `https://sample-university-site.herokuapp.com/candidate/${cpf}`,
  });

  const data = filterData(response);

  const name = filterName(data);
  const score = filterScore(data);

  return cpfIsValid(cpf) && { name, score, CPF: cpf }
}

const getCandidates= async () => {
  const cpfList = await getCpfList();

  const candidates = await Promise.all(cpfList.map(getCandidateByCpf));

  return candidates;
}


getCandidates();