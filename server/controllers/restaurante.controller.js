const restaurante = require('../models/restaurante.model');
//controlador para al crear un restaurante se controle en la base de datos que el nombre no se repita, si se repite se retorne un error

module.exports.createRestaurante = async (req, res) => {
    const { nombre, direccion, imagen, valoracion, tipo } = req.body;

    try {
        // Verificar si ya existe un restaurante con el mismo nombre
        const existe = await restaurante.findOne({ nombre });
        if (existe) {
            return res.status(400).json({ message: "El nombre del restaurante ya existe" });
        }

        const nuevoRestaurante = await restaurante.create({
            nombre,
            direccion,
            imagen,
            valoracion,
            tipo
        });
        res.status(201).json(nuevoRestaurante);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Obtener todos los restaurantes
module.exports.getAllRestaurantes = (req, res) => {
    restaurante.find()
        .then(restaurantes => res.json(restaurantes))
        .catch(err => res.status(400).json(err));
}
//obtener todos los restaurantes con reputacion minima y maxima
module.exports.getAllRestaurantesConReputacion = (req, res) => {
    const { min, max } = req.query;
    let filter = {};
    if (min && max) {
        filter = { valoracion: { $gte: min, $lte: max } };
    }
    restaurante.find(filter)
        .then(restaurantes => res.json(restaurantes))
        .catch(err => res.status(400).json(err));
}


// Obtener restaurante por ID
module.exports.getRestauranteById = (req, res) => {
    restaurante.findById(req.params.id)
        .then(restaurante => {
            if (!restaurante) return res.status(404).json({ message: "Restaurante no encontrado" });
            res.json(restaurante);
        })
        .catch(err => res.status(400).json(err));
}

// Actualizar restaurante
module.exports.updateRestaurante = (req, res) => {
    restaurante.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(restaurante => {
            if (!restaurante) return res.status(404).json({ message: "Restaurante no encontrado" });
            res.json(restaurante);
        })
        .catch(err => res.status(400).json(err));
}

// Eliminar restaurante
module.exports.deleteRestaurante = (req, res) => {
    restaurante.findByIdAndDelete(req.params.id)
        .then(restaurante => {
            if (!restaurante) return res.status(404).json({ message: "Restaurante no encontrado" });
            res.json({ message: "Restaurante eliminado" });
        })
        .catch(err => res.status(400).json(err));
}