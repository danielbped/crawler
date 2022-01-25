const express = require('express');

const app = express();

const error = require('../middlewares/error');
const root = require('../controllers/root');

root(app);
error(app);

module.exports = app;