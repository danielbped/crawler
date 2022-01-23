const express = require('express');

const error = require('./middlewares/error');

const root = require('./controllers/root');

require('dotenv').config();

const { PORT } = process.env;

const app = express();

root(app);

error(app);

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));

module.exports = app;