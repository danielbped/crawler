const Candidate = (sequelize, DataTypes) => {
  const Candidate = sequelize.define("Candidate", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    score: DataTypes.STRING,
    CPF: DataTypes.STRING,
    validCPF: DataTypes.BOOLEAN,
  },
  {
    tableName: 'Candidates',
  })

  return Candidate;
};

module.exports = Candidate;