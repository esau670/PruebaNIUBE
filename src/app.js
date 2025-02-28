const express = require ('express');
const morgan = require('morgan');
const config = require ('./config');
const cors = require ('cors')

//importamos colaborador
const colaborador = require('../controllers/rutas');
const error = require('./red/errors');
const app = express();

//middleware para desarrollo
app.use(morgan('dev'));
//middleware para reconocer json
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

//configuracion del puerto
app.set('port', config.app.port)

app.use(cors())
//ruta
app.use('/colaboradores', colaborador)

//importamos el tratamineto de errores
app.use(error)


//Esportamos app
module.exports = app;