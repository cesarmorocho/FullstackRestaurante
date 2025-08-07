//un controlador que permite crear, obtener, actualizar y eliminar menús 
const Menu = require('../models/menu.models.js');
const Restaurante = require('../models/restaurante.model.js');
const TipoComida = require('../models/tipocomida.model.js');

module.exports.createMenu = async (req, res) => {
    try {
        const { restauranteId, tipoComidaId } = req.body;
        const menu = await Menu.create({
            RestauranteId: restauranteId,
            TipoComidaId: tipoComidaId
        });
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll({
            include: [
                { model: Restaurante, as: 'Restaurante' },
                { model: TipoComida, as: 'TipoComida' }
            ]
        });
        res.json(menus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id, {
            include: [
                { model: Restaurante, as: 'Restaurante' },
                { model: TipoComida, as: 'TipoComida' }
            ]
        });
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports.updateMenu = async (req, res) => {
    try {
        const [updatedRowCount] = await Menu.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedRowCount) {
            const updatedMenu = await Menu.findOne({ where: { _id: req.params.id } });
            return res.json(updatedMenu);
        } else {
            return res.status(404).json({ message: "Menu not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (!menu) return res.status(404).json({ message: "Menu not found" });

        await menu.destroy();
        res.json({ message: "Menu deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//un controlador que perimta obtener los tipos de comida que ofrece un restaurante
module.exports.getTiposComidaByRestaurante = async (req, res) => {
    try {
        const restauranteId = req.params.id;
        const tiposComida = await TipoComida.findAll({
            include: [{
                model: Restaurante,
                where: { _id: restauranteId },
                through: { attributes: [] } // Excluir atributos de la tabla intermedia
            }]
        });
        res.json(tiposComida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};