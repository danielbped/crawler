const express = require('express');

const getCandidates = require('./getCandidates');

const root = express.Router({ mergeParams: true });

getCandidates(root);

module.exports = (app) => {
  app.use('/', root);
}