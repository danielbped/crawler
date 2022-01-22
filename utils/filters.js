const {
  CANDIDATE_REGEX,
  NAME_REGEX,
  SCORE_REGEX,
  CPF_REGEX,
} = require('./Regex');

const filterData = ({ data }) => data.match(CANDIDATE_REGEX);
const filterName = (data) => data[0].match(NAME_REGEX)[0].split(' ').slice(1).join(' ').slice(0, -1);
const filterScore = (data) => data[0].match(SCORE_REGEX)[0].split(' ').slice(1)[0];

const filterCpf = (data) => data.match(CPF_REGEX).map((cpf) => cpf.split('').splice(1).join(''));

module.exports = {
  filterData,
  filterName,
  filterScore,
  filterCpf,
}