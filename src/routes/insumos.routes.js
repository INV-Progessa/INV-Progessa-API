// Importar Express y el controlador
const express = require('express');
const router = express.Router();
const insumosController = require('../controller/insumos.controller.js');

// Ruta para crear un nuevo insumo
router.post('/insumo_crear', insumosController.crearInsumo);

router.post('/insumo_actualizar', insumosController.actualizarInsumo);

router.post('/insumo_listar', insumosController.listarInsumos);

module.exports = router;
