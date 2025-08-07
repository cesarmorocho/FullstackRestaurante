const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

//require('./server/config/mongoose.config'); // Importar la configuración de mongoose
// Middleware para parsear JSON, funciones que se van a ejecutar antes de las rutas
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios
app.use(cors()); // Middleware para permitir CORS

//const allRestaurantesRoutes = require('./server/routes/restaurante.routes'); // Importar las rutas de restaurantes
const allRestaurantesRoutes = require('./servermysql/routes/restaurante.routes');
const allTiposComidaRoutes = require('./servermysql/routes/tipocomida.routes'); // Importar las rutas de tipos de comida
const allMenuRoutes = require('./servermysql/routes/menu.routes'); // Importar las rutas de menú
const allUsersRoutes = require('./servermysql/routes/user.routes'); // Importar las rutas de usuarios
allRestaurantesRoutes(app); // Registrar las rutas de restaurantes
allTiposComidaRoutes(app); // Registrar las rutas de tipos de comida
allMenuRoutes(app); // Registrar las rutas de menú
allUsersRoutes(app); // Registrar las rutas de usuarios

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

//app.use(express.json());// Middleware para parsear JSON, funciones que se van a ejecutar antes de las rutas

app.listen(port, function () {
    console.log('server.js escuchando en el siguiente puerto', port);
});
