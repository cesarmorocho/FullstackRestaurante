const TipoComida = require('../models/tipocomida.model');

module.exports.createTipoComida = async (req, res) => {
    try {
        const tipoComida = await TipoComida.create(req.body);
        res.status(201).json(tipoComida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports.getAllTiposComida = async (req, res) => {
    try {
        const tiposComida = await TipoComida.findAll();
        res.json(tiposComida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports.getTipoComidaById = async (req, res) => {
    try {
        const tipoComida = await TipoComida.findByPk(req.params.id);
        if (!tipoComida) {
            return res.status(404).json({ message: "Tipo de comida no encontrado" });
        }
        res.json(tipoComida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports.updateTipoComida = async (req, res) => {
    try {
        const [updatedRowCount] = await TipoComida.update(req.body, {
            where: { _id: req.params.id }
        });
        if (updatedRowCount) {
            const updatedTipoComida = await TipoComida.findOne({ where: { _id: req.params.id } });
            return res.json(updatedTipoComida);
        } else {
            return res.status(404).json({ message: "Tipo de comida no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Eliminar tipo de comida
module.exports.deleteTipoComida = async (req, res) => {
    try {
        const tipoComida = await TipoComida.findByPk(req.params.id);
        if (!tipoComida) return res.status(404).json({ message: "Tipo de comida no encontrado" });

        await tipoComida.destroy();
        res.json({ message: "Tipo de comida eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}