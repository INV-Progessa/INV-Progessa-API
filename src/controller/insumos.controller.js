// Importar la conexión a la base de datos
const client = require('../../db/db.js');

// Crear un nuevo insumo llamando al stored procedure
exports.crearInsumo = async (req, res) => {
  const { nombre, descripcion, codigo_barra, cantidad_disponible, id_categoria, id_usuario_creador } = req.body;

  try {
    // Llamar al stored procedure sp_crear_insumo
    await client.query(
      'CALL sp_crear_insumo($1, $2, $3, $4, $5, $6)',
      [nombre, descripcion, codigo_barra, cantidad_disponible, id_categoria, id_usuario_creador]
    );

    res.status(201).json({
      message: 'Insumo creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear el insumo:', error);
    res.status(500).json({
      error: 'Hubo un error al crear el insumo'
    });
  }
};


exports.actualizarInsumo = async (req, res) => {
  const { codigo_barra, cantidad_agregada, id_usuario_modificador } = req.body;

  try {
    // Llamar al stored procedure sp_crear_insumo
    await client.query(
      'CALL sp_actualizar_insumo($1, $2, $3)',
      [codigo_barra, cantidad_agregada, id_usuario_modificador]
    );

    res.status(201).json({
      message: 'Insumo actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar el insumo:', error);
    res.status(500).json({
      error: 'Hubo un error al actualizar el insumo'
    });
  }
};

// Función para listar insumos
exports.listarInsumos = async (res) => {
  try {
    // Ejecutar la consulta para listar insumos
    const result = await client.query(`
      SELECT 
        i.id_insumo,
        i.nombre,
        i.descripcion,
        i.codigo_barra,
        i.cantidad_disponible,
        i.fecha_creacion,
        i.fecha_modificacion,
        c.descripcion_categoria,
        u.nombre_usuario AS creador
      FROM insumo i
      JOIN categoria c ON i.id_categoria = c.id_categoria
      JOIN usuario u ON i.id_usuario_creador = u.id_usuario;
    `);
    
    // Enviar los insumos como respuesta en formato JSON
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al listar los insumos:', error);
    res.status(500).json({
      error: 'Hubo un error al listar los insumos'
    });
  }
};
