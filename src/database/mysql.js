const mysql = require('mysql');
const config = require('../config');

// importamos desde config
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function conMysql(){
    connection= mysql.createConnection(dbconfig);

    connection.connect((err)=>{
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql,200)
        }else{
            console.log('DB conectada!');
        }
    });

    connection.on('error', err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        } else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){
    return new Promise((res,rej) =>{
        connection.query(`SELECT * FROM ${tabla}`, (error, result)=> {
            return error ? rej(error) : res(result);
        });
       });
}

function uno(tabla, id){
    return new Promise((res,rej) =>{
        connection.query(`SELECT * FROM ${tabla} WHERE IDCOLABORADOR=${id}`, (error, result)=> {
        return error ? rej(error) : res(result);
        });
       });
}

function agregar(tabla, data){
    return new Promise((resolve,reject) =>{
        connection.query(`INSERT INTO ${tabla} SET ?`, data, (error, result)=> {
        return error ? reject(error) : resolve(result);
        });
       });
    }

function actualizar(tabla, data){
    return new Promise((resolve,reject) =>{
        connection.query(`UPDATE ${tabla} SET ? WHERE IDCOLABORADOR = ?`, [data,data.IDCOLABORADOR], (error, result)=> {
        return error ? reject(error) : resolve(result);
        });
       });
}

function eliminar(tabla, id){
    return new Promise((resolve,reject) =>{
        connection.query(`DELETE FROM ${tabla} WHERE IDCOLABORADOR=${id}`, (error, result)=> {
        return error ? reject(error) : resolve(result);
        });
       });
}

module.exports = {
    todos, 
    uno,
    agregar,
    actualizar,
    eliminar
}