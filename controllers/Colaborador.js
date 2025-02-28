const express = require('express');

const controlador = require('./controller');

const route = express.Router();

route.get('/', function (req, res){
    const todos = controlador.todos();
})

module.exports = router;