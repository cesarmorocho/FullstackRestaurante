const userController = require('../controllers/user.controller.js');

module.exports = (app) => {
  app.post('/users', userController.createUser);
  app.get('/users', userController.getAllUsers);
  app.get('/users/:id', userController.getUserById);
  app.put('/users/:id', userController.updateUser);
  app.delete('/users/:id', userController.deleteUser);
  app.post('/users/login', userController.loginUser);
};