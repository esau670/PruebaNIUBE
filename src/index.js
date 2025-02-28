const app = require('./app');

// iniciamos el servidor
app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto ", app.get("port"));
})   