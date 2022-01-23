const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../index');

chai.use(chaiHttp);

describe('GET '/'', () => {
  
})