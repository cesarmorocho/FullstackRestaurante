const mongoose = require('mongoose');

// Esquema para Restaurante (sin incluir el id, que mongoose maneja automáticamente)
const RestauranteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"]
  },
  direccion: {
    type: String,
    required: [true, "La dirección es requerida"]
  },
  imagen: {
    type: String,
    required: [true, "La URL de la imagen es requerida"]
  },
  valoracion: {
    type: String,
    required: [true, "La valoración es requerida"]
  },
  tipo: {
    type: String,
    required: [true, "El tipo es requerido"],
    enum: ["Tradicional", "Comida Rápida", "Parrillada"]
  }
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);
module.exports = Restaurante;