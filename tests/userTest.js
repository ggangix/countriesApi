const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('User API', () => {
  it('should be able to register a user', (done) => {
    chai
      .request(app)
      .post('/users/register')
      .send({
        username: 'luke',
        password: 'skywalker',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User created');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should be able to login a user', (done) => {
    chai
      .request(app)
      .post('/users/login')
      .send({
        username: 'luke',
        password: 'skywalker',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User logged in');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should not be able to login a user with wrong credentials', (done) => {
    chai
      .request(app)
      .post('/users/login')
      .send({
        username: 'luke',
        password: 'trotacielos',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid credentials');
        done();
      });
  });

  it('should not be able to register a user with the same username', (done) => {
    chai
      .request(app)
      .post('/users/register')
      .send({
        username: 'luke',
        password: 'skywalker',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Something went wrong');
        done();
      });
  });
});
