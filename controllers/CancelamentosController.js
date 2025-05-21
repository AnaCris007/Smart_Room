// Importa a conexão com o banco de dados
const db = require('../config/database');

// Função para registrar um cancelamento de reserva
const registrarCancelamento = async (req, res) => {
  const { id_reservas, dia_cancelar } = req.body;

  // Verifica se os campos obrigatórios foram enviados
  if (!id_reservas || !dia_cancelar) {
    return res.status(400).json({ error: 'Campos obrigatórios: id_reservas e dia_cancelar.' });
  }

  try {
    const query = `
      INSERT INTO Cancelamentos (id_reservas, dia_cancelar)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [id_reservas, dia_cancelar];

    const { rows } = await db.query(query, values);

    return res.status(201).json({ cancelamento: rows[0] });
  } catch (error) {
    console.error('Erro ao registrar cancelamento:', error);
    return res.status(500).json({ error: 'Erro ao registrar cancelamento.' });
  }
};

// Função para listar todos os cancelamentos registrados
const listarCancelamentos = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Cancelamentos ORDER BY dia_cancelar DESC');
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar cancelamentos:', error);
    return res.status(500).json({ error: 'Erro ao buscar cancelamentos.' });
  }
};

// Exporta as funções para uso nas rotas
module.exports = {
  registrarCancelamento,
  listarCancelamentos,
};
