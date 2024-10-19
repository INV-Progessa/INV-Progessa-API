// Importar Express
const express = require('express');
const app = express();

// Importar las rutas de insumos
const insumosRoutes = require('../src/routes/insumos.routes.js');
const authRoutes = require('../src/routes/auth.routes.js')

// Definir el puerto
const PORT = process.env.API_PORT;

// Middleware para interpretar JSON
app.use(express.json());

// Usar las rutas de insumos con el prefijo /api/insumos
app.use(insumosRoutes, authRoutes);

// Ruta raíz de prueba para verificar que el servidor esté corriendo
app.get('/', (res) => {
  res.send('¡Bienvenido a la API de Inventarios!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
