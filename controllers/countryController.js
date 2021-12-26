const mongoose = require('mongoose');
const Country = mongoose.model('Country');

const getCountries = (req, res) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 0;
  const page = parseInt(query.page) || 1;
  const sort = query.sort || 'code';
  const order = query.order || 'asc';

  const options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: { [sort]: order },
  };

  Country.find({}, null, options, (err, countries) => {
    if (err) {
      res.send(err);
    }
    res.json(countries);
  });
};

const addCountry = (req, res) => {
  var newCountry = new Country(req.body);
  newCountry.save((err, country) => {
    if (err) {
      res.send(err);
    }
    res.json(country);
  });
};

const getCountryByCode = (req, res) => {
  Country.find({ code: req.params.code.toUpperCase() }, (err, country) => {
    if (err) {
      res.send(err);
    }
    if (country.length === 0) {
      return res.status(404).send({ message: 'Country not found' });
    }
    res.json(country);
  });
};

const updateCountry = (req, res) => {
  Country.findOneAndUpdate(
    { code: req.params.code },
    req.body,
    { new: true },
    (err, country) => {
      if (err) {
        res.send(err);
      }
      res.json(country);
    }
  );
};

const deleteCountry = (req, res) => {
  Country.deleteOne({ code: req.params.code }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Country successfully deleted' });
  });
};

module.exports = {
  getCountries,
  addCountry,
  getCountryByCode,
  updateCountry,
  deleteCountry,
};
