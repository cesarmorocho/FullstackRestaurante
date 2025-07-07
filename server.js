const express = require('express');
const app = express();
const port = 8000;



const restaurantes = [
    { id: 1, nombre: "Restaurante El Buen Sabor", direccion: "Ladron de Guevara 123" },
    { id: 2, nombre: "Restaurante La Delicia", direccion: "Avenida Siempre Viva 456" },
    { id: 3, nombre: "Restaurante Sabores del Mundo", direccion: "Calle Falsa 789" }
]
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

//Enviar la lista de restaurantes al cliente
app.get('/restaurantes', (req, response) => {
    //console.log("Query:", req.query);
    //response.send("Hola Mundo");
    //response.json({nombre: "Restaurante El Buen Sabor", direccion: "Ladron de Guevara 123"});
    //response.status(200).json({nombre: "Restaurante El Buen Sabor", direccion: "Ladron de Guevara 123"});
    //response.status(200).json(restaurantes);
response.json(restaurantes);
});

//metodo para obtener el item del restaurante por id
app.post("/restaurantes", (req, response) => {
    restaurantes.push(req.body);
    response.json({status: "ok"});
});

//metodo para obtener el item del restaurante por id
app.get("/restaurantes/:id", (req, response) => {
    if(req.params.id >= 0 && req.params.id < restaurantes.length) {
        response.json(restaurantes[req.params.id]);
    }else {
        response.status(404).json({ "error": "Recurso no encontrado" });
    }
});

//metodo para actualziar un restaurante
app.put("/restaurantes/:id", (req, response) => {
    const id = parseInt(req.params.id, 10);
    if (id >= 0 && id < restaurantes.length) {
        restaurantes[id] = req.body;
        response.json({ status: "ok", message: "Restaurante actualizado exitosamente" });
    } else {
        response.status(404).json({ "error": "Recurso no encontrado" });
    }
});

//metodo para eliminar un restaurante
app.delete("/restaurantes/:id", (req, response)=>{
    const id = parseInt(req.params.id, 10);
    if (id >= 0 && id < restaurantes.length) {
        //Eliminar un restaurante
        restaurantes.splice(id, 1);
        response.json({ status: "ok", message: "Restaurante eliminado exitosamente" });
    } else {
        response.status(404).json({ "error": "Recurso no encontrado" });
    }
});
//app.use(express.json());// Middleware para parsear JSON, funciones que se van a ejecutar antes de las rutas

app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

app.post("/restaurantes", (req, response) =>{
   // console.log("Body:", req.body);
   //response.status(201).json({nombre: "Restaurante El Buen Sabor", direccion: "Ladron de Guevara 123"});
  // response.send("Hola Mundo");
    response.status(200).send("¡Restaurante creado exitosamente!");
})

app.get('/', function (_, res) {
    //res.send('¡Hola Mundo!');
    //response.status(200).send("¡Restaurante creado exitosamente!");
});


app.listen(port, function () {
    console.log('server.js escuchando en el siguiente puerto', port);
});
