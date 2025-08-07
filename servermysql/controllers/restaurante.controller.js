const Restaurante = require('../models/restaurante.model');
const TipoComida = require('../models/tipocomida.model'); 

module.exports.createRestaurante = async (req, res) => {
    const { nombre, direccion, imagen, valoracion, tipo } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario del token JWT

    try {
        // Verificar si ya existe un restaurante con el mismo nombre
        const existe = await Restaurante.findOne({ where: { nombre } });
        if (existe) {
            return res.status(400).json({ message: "El nombre del restaurante ya existe" });
        }

        const nuevoRestaurante = await Restaurante.create({
            nombre,
            direccion,
            imagen,
            valoracion,
            tipo,
            userId // Asociar el restaurante al usuario que lo crea
        });
        res.status(201).json(nuevoRestaurante);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Obtener todos los restaurantes con async/await
module.exports.getAllRestaurantes = async (_, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.json(restaurantes);
    } catch (err) {
        res.status(400).json(err);
    }
}

//obtener todos los restaurantes con reputacion minima y maxima con un rango de valoracion usando async/await
const { Op } = require('sequelize');
module.exports.getAllRestaurantesCon = async (req, res) => {
    try {
        const { min, max } = req.params;
        const filter = {};
        if (min && max) {
            filter.valoracion = { [Op.between]: [min, max] };
        }
        const restaurantes = await Restaurante.findAll({ where: filter });
        res.json(restaurantes);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Obtener restaurante por ID con async/await
module.exports.getRestauranteById = async (req, res) => {
    const id = req.params.id;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }
        res.json(restaurante);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Actualizar restaurante
module.exports.updateRestaurante = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token JWT
        const restaurante = await Restaurante.findByPk(req.params.id);
        
        if (!restaurante) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }

        // Verificar si el usuario es el creador del restaurante
        if (restaurante.userId && restaurante.userId !== userId) {
            return res.status(403).json({ message: "No tienes permisos para editar este restaurante" });
        }

        const [updatedRowCount] = await Restaurante.update(req.body, {
            where: { _id: req.params.id }
        });
        
        if (updatedRowCount) {
            const updatedRestaurante = await Restaurante.findByPk(req.params.id);
            return res.json(updatedRestaurante);
        } else {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        } 
    } catch (err) {
        res.status(500).json(err);
    }
};

// Eliminar restaurante
module.exports.deleteRestaurante = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token JWT
        const restaurante = await Restaurante.findByPk(req.params.id);
        
        if (!restaurante) {
            return res.status(404).json({ message: "Restaurante no encontrado" });
        }

        // Verificar si el usuario es el creador del restaurante
        if (restaurante.userId && restaurante.userId !== userId) {
            return res.status(403).json({ message: "No tienes permisos para eliminar este restaurante" });
        }

        await restaurante.destroy();
        res.json({ message: "Restaurante eliminado correctamente" });
    } catch (err) {
        res.status(400).json(err);
    }
}

// Obtener restaurantes por tipo de comida
module.exports.getRestaurantesByTipoComida = async (req, res) => {
    try {
        const tipoComidaId = req.params.id;
        // Verifica si el tipo de comida existe
        const tipoComida = await TipoComida.findByPk(tipoComidaId);
        if (!tipoComida) {
            return res.status(404).json({ message: "El tipo de comida no existe" });
        }
        // Busca los restaurantes asociados a ese tipo de comida
        const restaurantes = await tipoComida.getRestaurantes();
        res.json(restaurantes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

