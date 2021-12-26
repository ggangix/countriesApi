const mongoose = require('mongoose');
const countryModel = require('../models/countryModel.js');
const userModel = require('../models/userModel.js');
const { COUNTRIES } = require('../initialData');
const { USERS } = require('../initialData');
const { bulkAdd } = require('../utils');

const MONGODB_URL = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    populateDB();
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

// Populate the database with initial data
const populateDB = async () => {
  countryModel.find({}, (err, countries) => {
    if (countries.length === 0) {
      bulkAdd(COUNTRIES, countryModel).then((docs) => {
        console.log(`Added ${docs.length} countries to the database`);
      });
    }
  });

  userModel.find({}, (err, users) => {
    if (users.length === 0) {
      bulkAdd(USERS, userModel).then((docs) => {
        console.log(`Added ${docs.length} users to the database`);
      });
    }
  });
};
