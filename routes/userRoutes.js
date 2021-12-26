const userController = require('../controllers/userController');

module.exports = function userRoutes(app) {
  app.route('/users/login').post(userController.loginUser);
  app.route('/users/register').post(userController.registerUser);
};
