const db = require('../config/database'); // Importa conexão com o banco

// Cadastrar uma nova reserva
const cadastrarReserva = async (req, res) => {
  const { matricula_alunos, id_salas_dispo, id_duracao, horario, dia } = req.body;

  // Validação básica dos campos obrigatórios
  if (!matricula_alunos || !id_salas_dispo || !id_duracao || !horario || !dia) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se a duração existe na tabela Duracao
    const duracaoCheck = await db.query(
      'SELECT * FROM Duracao WHERE id_duracao = $1',
      [id_duracao]
    );

    if (duracaoCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Duração inválida. Escolha uma duração válida.' });
    }

    // Insere a nova reserva no banco de dados
    const query = `
      INSERT INTO Reservas (matricula_alunos, id_salas_dispo, id_duracao, horario, dia)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [matricula_alunos, id_salas_dispo, id_duracao, horario, dia];

    const { rows } = await db.query(query, values);

    // Retorna a reserva criada
    return res.status(201).json({ reserva: rows[0] });

  } catch (error) {
    console.error('Erro ao cadastrar reserva:', error);

    // Exemplo: tratar erro de chave estrangeira inválida (FK)
    if (error.code === '23503') {
      return res.status(400).json({ error: 'Referência inválida para aluno, sala ou duração.' });
    }

    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Listar todas as reservas
const listarReservas = async (req, res) => {
  try {
    const query = `
      SELECT r.*, a.nome AS nome_aluno, s.numero_sala, d.descricao_duracao
      FROM Reservas r
      JOIN Alunos a ON r.matricula_alunos = a.matricula
      JOIN Salas_disponiveis s ON r.id_salas_dispo = s.id_salas_dispo
      JOIN Duracao d ON r.id_duracao = d.id_duracao
      ORDER BY r.dia, r.horario;
    `;
    const { rows } = await db.query(query);
    return res.status(200).json(rows);

  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    return res.status(500).json({ error: 'Erro ao buscar reservas.' });
  }
};

// Editar uma reserva existente
const editarReserva = async (req, res) => {
  const { id } = req.params;
  const { matricula_alunos, id_salas_dispo, id_duracao, horario, dia } = req.body;

  if (!matricula_alunos || !id_salas_dispo || !id_duracao || !horario || !dia) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = `
      UPDATE Reservas
      SET matricula_alunos = $1,
          id_salas_dispo = $2,
          id_duracao = $3,
          horario = $4,
          dia = $5
      WHERE id_reservas = $6
      RETURNING *;
    `;
    const values = [matricula_alunos, id_salas_dispo, id_duracao, horario, dia, id];

    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    return res.status(200).json({ reserva: rows[0] });

  } catch (error) {
    console.error('Erro ao editar reserva:', error);
    return res.status(500).json({ error: 'Erro ao editar reserva.' });
  }
};

// Deletar uma reserva pelo ID
const deletarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM Reservas WHERE id_reservas = $1 RETURNING *;';
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    return res.status(200).json({ message: 'Reserva excluída com sucesso.' });

  } catch (error) {
    console.error('Erro ao deletar reserva:', error);
    return res.status(500).json({ error: 'Erro ao deletar reserva.' });
  }
};

// Exporta todas as funções
module.exports = {
  cadastrarReserva,
  listarReservas,
  editarReserva,
  deletarReserva
};
