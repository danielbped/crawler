const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const shell = require('shelljs');

const server = require('../api');

chai.use(chaiHttp);

describe('Testa se a rota GET /', () => {
  
  shell.exec('npx sequelize db:drop');
  shell.exec('npx sequelize db:create');
  shell.exec('npx sequelize db:migrate');

  it('retorna um status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.status).to.be.equal(200)
        done()
      });
  });

  it('retorna uma string com os dados dos candidatos', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.text).to.be.a('string')
        done()
      });
  });

  it('retorna uma string com o nome correto do candidato', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.text).includes('ANTHONY KING')
        done()
      });
  });

  it('retorna uma string com o cpf correto do candidato', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.text).includes('87645213035')
        done()
      });
  });

  it('retorna uma string com o score correto do candidato', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.text).includes('85.38')
        done()
      });
  });

  it('retorna uma string com a informação correta sobre a validade do CPF do candidato', (done) => {
    chai.request(server)
      .get('/')
      .end((_err, res) => {
        expect(res.text).includes('"validCPF":true')
        done()
      });
  });
});