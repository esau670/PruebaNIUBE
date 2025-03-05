const express = require('express');
//importamos respuestas
const respuestas = require('../src/red/respuestas');
const controlador = require('./controller');

const router = express.Router();

//rutas de controller
router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', actualizar);
router.delete('/:id', eliminar);

// obtener todos los registros
 async function todos (req, res,next){
    try{
        const items = await controlador.todos()
        //respuesta
        .then((items)=>{
            respuestas.success(req,res, items,200)
        });
    } catch(err){
        //respuestas.error(req,res, err, 500)
        next(err)
    }   
};

//obtener por id
async function uno (req, res,next){
    try{
        const items = await controlador.uno(req.params.id);
        respuestas.success(req,res, items,200)
    } catch(err){
        //respuestas.error(req,res, err, 500)
        next(err)
    } 
};

/*
//agregar registro
async function agregar (req, res,next){
    try{
        const items = await controlador.agregar(req.body);
       respuestas.success(req,res, 'Agregado satisfactoriamente!',201)
    } catch(err){
        //respuestas.error(req,res, err, 201)
        next(err)
    } 
};*/



// Agregar con validacion de edad, nombre y apellido
async function agregar(req, res, next) {
    try {
        // nombre, apellido y edad correctos
        const { NOMBRE, APELLIDO, EDAD } = req.body; 
        if (!NOMBRE || !APELLIDO || !EDAD) {
            return respuestas.error(req, res, 'Los campos nombre, apellido y edad son obligatorios', 400);
        }
        if (isNaN(EDAD) || EDAD <= 0) {
            return respuestas.error(req, res, 'La edad debe ser un número mayor a 0', 400);
        }
        // agregar si campos estan correctos
        const items = await controlador.agregar(req.body);
        respuestas.success(req, res, 'Agregado satisfactoriamente!', 201);
    } catch (err) {
        next(err);
    }
};




//actualizar registro
async function actualizar (req, res, next){
    try{
        const items = await controlador.actualizar(req.body);
       respuestas.success(req,res, 'Actualizado satisfactoriamente!',200)
    } catch(err){
        //respuestas.error(req,res, err, 201)
        next(err)
    } 
};

// eliminar registro
async function eliminar (req, res, next){
    try{
        const items = await controlador.eliminar(req.params.id);
        console.log(items)
       respuestas.success(req,res, 'Eliminado satisfactoriamente!',200)
    } catch(err){
        //respuestas.error(req,res, err, 500)
        next(err)
    } 
};


module.exports = router;