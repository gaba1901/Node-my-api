const http = require('http');
const express = require('express');
const productosRouter = require('./David_Santiago_Guaba_Montoya_productos'); // Importar el router

const app = express();
app.use(express.json()); // Para poder leer JSON en las peticiones
app.use('/productos', productosRouter); // Usar el router para la ruta /productos

app.get('/', (req, res) => {
    res.send('¡Está funcionando!');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
    console.debug('Aplicación funcionando en el puerto ' + port);
});
