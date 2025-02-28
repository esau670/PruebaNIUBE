function error (mesage, code){
    let e = new Error(mesage);

    if (code){
        e.statusCode = code
    }
    return e;
}

module.exports = error