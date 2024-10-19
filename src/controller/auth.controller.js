// Importar la conexión a la base de datos
const client = require('../../db/db.js');

// Función para iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    // Llamar a la función almacenada sp_iniciar_sesion
    const result = await client.query(
      'SELECT * FROM sp_iniciar_sesion($1, $2)',
      [correo_electronico, contrasena]
    );

    // Verificar si se encontró el usuario
    if (result.rows.length === 0) {
      return res.status(401).json({
        error: 'Correo o contraseña incorrectos'
      });
    }

    // Devolver los detalles del usuario si la autenticación fue exitosa
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      error: 'Hubo un error al procesar la solicitud'
    });
  }
};
