const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notNull: { msg: "El id es requerido" }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El username es requerido" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El email es requerido" },
      isEmail: { msg: "Debe ser un email válido" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "La contraseña es requerida" },
      len: {
        args: [6, 100],
        msg: "La contraseña debe tener entre 6 y 100 caracteres"
      }
    }
  },
});

module.exports = User;