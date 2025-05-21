const db = require('../config/database'); // importa conexão com o banco

// Função para cadastrar uma nova sala disponível
const cadastrarSala = async (req, res) => {
  const { numero_sala, dia_disponivel, a_partir_das, ate_as } = req.body;

  // Validação simples dos campos obrigatórios
  if (!numero_sala || !dia_disponivel || !a_partir_das || !ate_as) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Validação para garantir que o horário final é maior que o inicial
  if (ate_as <= a_partir_das) {
    return res.status(400).json({ error: 'O horário "até_as" deve ser maior que "a_partir_das".' });
  }

  try {
    const query = `
      INSERT INTO Salas_disponiveis (numero_sala, dia_disponivel, a_partir_das, ate_as)
      VALUES ($1, $2, $3, $4)
      RETURNING *;  -- Retorna a sala inserida
    `;
    const values = [numero_sala, dia_disponivel, a_partir_das, ate_as];

    const { rows } = await db.query(query, values);

    return res.status(201).json({ sala: rows[0] });

  } catch (error) {
    console.error('Erro ao cadastrar sala:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Função para listar todas as salas disponíveis
const listarSalas = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Salas_disponiveis ORDER BY dia_disponivel, a_partir_das ASC');
    return res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return res.status(500).json({ error: 'Erro ao buscar salas disponíveis.' });
  }
};

// Exporta as funções para usar nas rotas
module.exports = {
  cadastrarSala,
  listarSalas,
};
