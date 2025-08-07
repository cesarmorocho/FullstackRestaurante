const tipocomidaController = require('../controllers/tipocomida.controller.js');

module.exports = (app) => {
    app.post('/tipocomidas', tipocomidaController.createTipoComida);
    app.get('/tipocomidas', tipocomidaController.getAllTiposComida);
    app.get('/tipocomidas/:id', tipocomidaController.getTipoComidaById);
    app.put('/tipocomidas/:id', tipocomidaController.updateTipoComida);
    app.delete('/tipocomidas/:id', tipocomidaController.deleteTipoComida);
}
