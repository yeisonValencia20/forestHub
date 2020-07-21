'use strict'

/*
	Fichero encargado de llevar toda la configuración de Express,
	es decir, la configuración del servidor y demás parámetros.
*/

//Delaración constante express que permitirá trabajar con el servidor local.
const express = require('express');
//Declaración constante body-parser que permitirá trabajar con archivos.json y parsearlos para JS.
const bodyParser = require('body-parser');


//Import config.
require('./config/config');

//Declaración de la constante app que invocará a express.
const app = express();

//Sección para cargar middlewares.
//Middleware: método que se ejecuta antes de que llegue a un controlador en cada petición.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Información lo convertirá en un tipo JSON.



//Sección para cors.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


//Sección para cargar rutas desde index.js que contendrá las demás rutas.
let userRouter = require('./routes/index.js');
app.use('/api', userRouter); //'api/home'
//Por último se trae la creación del Router y finalizará con dos servicios en las rutas
// localhost:ttt/api/home
// localhost:ttt/api/prueba


module.exports = app;