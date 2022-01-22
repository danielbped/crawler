
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'crawler',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};