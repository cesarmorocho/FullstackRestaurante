const User = require('../models/user.models.js');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) =>{
return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

//Controlador para crear y registrar un usuario
module.exports.createUser = async (request, response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        return response.status(400).json({ message: '¡Faltan campos, todos son obligatorios!' });
    }
    try {
        // Buscar usuario por email
        const userFound = await User.findOne({ where: { email } });
        if (userFound) {
            return response.status(400).json({ message: 'El usuario ya existe' });
        }
        // Hashear password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Crear usuario
        const user = await User.create({ username, email, password: hashedPassword });
        response.json({
            email: user.email,
            username: user.username,
            _id: user.id,
            token: generateToken(user.id)
        });
    } catch (err) {
        response.status(500).json({ message: 'No se pudo crear el usuario', error: err.message });
    }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const [updatedRowCount] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRowCount) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.json(updatedUser);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Implementacion de controlador de login
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
