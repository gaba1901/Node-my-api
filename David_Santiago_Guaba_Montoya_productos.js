const express = require('express');
const router = express.Router();

const data = [
    {id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date()},
    {id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date()},
    {id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date()},
    {id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date()},
    {id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date()},
];

// Método GET para obtener todos los productos
router.get('/', (req, res) => {
    res.status(200).json(data);
});

// Método GET para obtener un producto específico
router.get('/:id', (req, res) => {
    let found = data.find(item => item.id === parseInt(req.params.id));

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// Método POST para crear un nuevo producto
router.post('/', (req, res) => {
    let newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    
    let newItem = {
        id: newId,
        nombre: req.body.nombre,
        valor: req.body.valor,
        enStock: req.body.enStock,
        createdOn: new Date()
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

// Método PUT para actualizar un producto
router.put('/:id', (req, res) => {
    let found = data.find(item => item.id === parseInt(req.params.id));

    if (found) {
        found.nombre = req.body.nombre || found.nombre;
        found.valor = req.body.valor || found.valor;
        found.enStock = req.body.enStock !== undefined ? req.body.enStock : found.enStock;

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Método DELETE para eliminar un producto
router.delete('/:id', (req, res) => {
    let found = data.find(item => item.id === parseInt(req.params.id));

    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;