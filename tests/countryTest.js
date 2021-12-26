const mocha = require('mocha');
const describe = mocha.describe;
const before = mocha.before;
const it = mocha.it;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const jwt = require('jsonwebtoken');
const data = require('../initialData');
const COUNTRIES = data.COUNTRIES;
const USERS = data.USERS;
const Country = require('../models/countryModel');
const User = require('../models/userModel');
chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('Country API', () => {
  before(async () => {
    await Country.deleteMany({});
    await Country.insertMany(COUNTRIES);
  });

  before(async () => {
    await User.deleteMany({});
    await User.insertMany(USERS);
    const token = jwt.sign(
      { username: USERS[0].username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    this.token = token;
  });

  it('should return all countries', (done) => {
    chai
      .request(app)
      .get('/countries')
      .auth(this.token, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(COUNTRIES.length);
        done();
      });
  });
  it('should add a country', (done) => {
    chai
      .request(app)
      .post('/countries')
      .auth(this.token, { type: 'bearer' })
      .send({
        code: 'TA',
        name: 'Tattoine',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('code').eql('TA');
        res.body.should.have.property('name').eql('Tattoine');
        done();
      });
  });

  it('should get a country by code', (done) => {
    chai
      .request(app)
      .get('/countries/VE')
      .auth(this.token, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property('code').eql('VE');
        res.body[0].should.have.property('name').eql('Venezuela');
        done();
      });
  });

  it('should update a country', (done) => {
    chai
      .request(app)
      .put('/countries/TA')
      .auth(this.token, { type: 'bearer' })
      .send({
        name: 'Tatouine',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('code').eql('TA');
        res.body.should.have.property('name').eql('Tatouine');
        done();
      });
  });

  it('should delete a country', (done) => {
    chai
      .request(app)
      .delete('/countries/TA')
      .auth(this.token, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql('Country successfully deleted');
        done();
      });
  });

  it('should return an error if country does not exist', (done) => {
    chai
      .request(app)
      .get('/countries/WW')
      .auth(this.token, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Country not found');
        done();
      });
  });
});
