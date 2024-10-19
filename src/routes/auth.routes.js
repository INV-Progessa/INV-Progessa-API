const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

// Ruta para iniciar sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;