const pool = require('../config/db');

exports.cancelarReserva = async (id_reservas) => {
  // Verifica se já existe um cancelamento para essa reserva
  const existe = await pool.query(
    'SELECT 1 FROM cancelamentos WHERE id_reservas = $1',
    [id_reservas]
  );
  if (existe.rowCount === 0) {
    // Só insere se ainda não existe
    await pool.query(
      'INSERT INTO cancelamentos (id_reservas, dia_cancelar) VALUES ($1, CURRENT_DATE)',
      [id_reservas]
    );
  }
  // Remove a reserva da tabela reservas
  await pool.query(
    'DELETE FROM reservas WHERE id_reservas = $1',
    [id_reservas]
  );
};
