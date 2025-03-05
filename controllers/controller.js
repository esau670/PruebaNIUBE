const db = require('../src/database/mysql');

//nombre de la tabla
const TABLA = 'COLABORADOR';

function todos(){
    return db.todos(TABLA);
}

function uno(id){
    return db.uno(TABLA, id);
} 

function agregar(body){ 
    return db.agregar(TABLA, body);
} 

function actualizar(body){
    return db.actualizar(TABLA, body);
} 

function eliminar(id){
    return db.eliminar(TABLA, id);
} 

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
    actualizar
}