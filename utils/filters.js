const {
  CANDIDATE_REGEX,
  NAME_REGEX,
  SCORE_REGEX,
  CPF_REGEX,
  SPECIAL_CHARACTERES_REGEX
} = require('./Regex');

const filterData = ({ data }) => data.match(CANDIDATE_REGEX);
const filterName = (data) => data[0].match(NAME_REGEX)[0].split(' ').slice(1).join(' ').slice(0, -1).toUpperCase().replace(SPECIAL_CHARACTERES_REGEX, '');
const filterScore = (data) => data[0].match(SCORE_REGEX)[0].split(' ').slice(1)[0];

const filterCpf = (data) => data.match(CPF_REGEX).map((cpf) => cpf.split('').splice(1).join(''));
const removeSpecialCpf = (cpf) => cpf.replace(SPECIAL_CHARACTERES_REGEX, '');

module.exports = {
  filterData,
  filterName,
  filterScore,
  filterCpf,
  removeSpecialCpf,
}