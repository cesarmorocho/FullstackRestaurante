//tabla intermedia entre restaurante y tipo comida
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Restaurante = require('./restaurante.model'); // Importa el modelo real
const TipoComida = require('./tipocomida.model');   // Importa el modelo real

const Menu = sequelize.define('Menu', {
    MenuDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Valor por defecto es la fecha actual
        allowNull: false,
    },
}, {
    timestamps: false
});

// Definición de la relación muchos a muchos
Restaurante.belongsToMany(TipoComida, { through: Menu, foreignKey: 'RestauranteId', otherKey: 'TipoComidaId' });
TipoComida.belongsToMany(Restaurante, { through: Menu, foreignKey: 'TipoComidaId', otherKey: 'RestauranteId' });

module.exports = Menu;