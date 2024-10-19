// src/db/db.js
const { Client } = require('pg');
require('dotenv').config();

// Configuración de la conexión
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Esto permite la conexión SSL sin verificación de certificado
    }
});

// Conectar a la base de datos
client.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('Error al conectar a PostgreSQL', err));

module.exports = client;

