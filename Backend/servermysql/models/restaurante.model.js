const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Restaurante = sequelize.define('Restaurante', {
_id: {
type: DataTypes.INTEGER,
allowNull: false,
autoIncrement: true,
primaryKey: true,
validate: {
notNull: { msg: "El id es requerido" }
}
},
nombre: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notNull: { msg: "El nombre es requerido" }
}
},
direccion: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notNull: { msg: "La dirección es requerida" }
}
},
tipo: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notNull: { msg: "El tipo es requerido" }
}
},
imagen: {
type: DataTypes.STRING,
allowNull: false,
validate: {
notNull: { msg: "La imagen es requerida" }
}
},
valoracion: {
type: DataTypes.FLOAT,
allowNull: true
},
userId: {
type: DataTypes.INTEGER,
allowNull: true, // Permitir null para restaurantes existentes
validate: {
isInt: { msg: "El userId debe ser un número entero" }
}
}
});

module.exports = Restaurante;