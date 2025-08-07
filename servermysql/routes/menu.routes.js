const MenuController = require('../controllers/menu.controller.js');
module.exports = (app) => {
    app.post('/menus', MenuController.createMenu);
    app.get('/menus', MenuController.getAllMenus);
    app.get('/menus/:id', MenuController.getMenuById);
    app.put('/menus/:id', MenuController.updateMenu);
    app.delete('/menus/:id', MenuController.deleteMenu);
    app.get('/restaurantes/:id/tipos-comida', MenuController.getTiposComidaByRestaurante);
};    