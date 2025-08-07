const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TipoComida = sequelize.define('TipoComida', {
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
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: { msg: "El nombre es requerido" },
            len: {
                args: [3, 50],
                msg: "El nombre debe tener entre 3 y 50 caracteres"
            }
        }
    },
    paisorigen: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: { msg: "El país de origen es requerido" },
            len: {
                args: [3, 50],
                msg: "El país de origen debe tener entre 3 y 50 caracteres"
            }
        }
    }
});
module.exports = TipoComida;
