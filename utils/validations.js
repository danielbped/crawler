const cpfIsValid = (cpf) => {
  const validation = cpf.split('')
  .map((num) => parseInt(num))
  .filter((num) => !isNaN(num))
  .reduce((acc, curr) => acc + curr)
  .toString().split('');
  
  if (validation[0] !== validation[1]) return false;
  
  return true;
}

const cpfAlreadyExists = (cpf, candidates) => candidates.some((candidate) => candidate.CPF === cpf);

module.exports = {
  cpfIsValid,
  cpfAlreadyExists,
}