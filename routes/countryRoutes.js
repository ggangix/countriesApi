const countryController = require('../controllers/countryController.js');

module.exports = function countryRoutes(app) {
  app
    .route('/countries')
    .get(countryController.getCountries)
    .post(countryController.addCountry);

  app
    .route('/countries/:code')
    .get(countryController.getCountryByCode)
    .put(countryController.updateCountry)
    .delete(countryController.deleteCountry);
};
