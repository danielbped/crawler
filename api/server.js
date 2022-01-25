const server = require('./index');

require('dotenv').config();

const { PORT } = process.env;

server.listen(PORT, () => console.log(`App listen on port ${PORT}`));

module.exports = server;