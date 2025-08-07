require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1];
            console.log('Token extraído: ', token);
            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Buscar usuario por id (MySQL usa 'id', no '_id') y excluir password
            const user = await User.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(401).json({ message: '¡No autorizado!' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: '¡No autorizado!' });
        }
    }
    // Si no se tiene un token de portador, entonces no estará autorizado
    if (!token) {
        return res.status(401).json({ message: '¡No autorizado, fallado token!' });
    }
};