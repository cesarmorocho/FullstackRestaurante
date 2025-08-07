const restauranteController = require('../controllers/restaurante.controller');
const { protect } = require('../middleware/authorization.middleware');

module.exports = (app) => {
    
    //Rutas protegidas que requieres token JWT
    app.post('/restaurantes',protect, restauranteController.createRestaurante);
    app.put('/restaurantes/:id',protect, restauranteController.updateRestaurante);
    app.delete('/restaurantes/:id',protect, restauranteController.deleteRestaurante);
    //Rutas públicas que no requieren token JWT
    app.get('/restaurantes', restauranteController.getAllRestaurantes);
    app.get('/restaurantes/valoracion/:min/:max', restauranteController.getAllRestaurantesCon);
    app.get('/restaurantes/:id', restauranteController.getRestauranteById);
    app.get('/restaurantes/restaurantesByTipoC/:id', restauranteController.getRestaurantesByTipoComida);
}