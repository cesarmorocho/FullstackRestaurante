const restauranteController = require('../controllers/restaurante.controller');

module.exports = (app) => {
    app.post('/restaurantes', restauranteController.createRestaurante);
    app.get('/restaurantes', restauranteController.getAllRestaurantes);
    app.get('/restaurantes/:id', restauranteController.getRestauranteById);
    app.get('/restaurantes/valoracion/:min/:max', restauranteController.getAllRestaurantesConReputacion);
    app.put('/restaurantes/:id', restauranteController.updateRestaurante);
    app.delete('/restaurantes/:id', restauranteController.deleteRestaurante);

}