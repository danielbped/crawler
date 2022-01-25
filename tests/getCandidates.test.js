const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');
const should = chai.should();

const app = require('../index');

chai.use(chaiHttp);

describe('Testa se a rota GET /', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
  })

  it('testa', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.should.have.status(200));
        done()
      })
  })
});