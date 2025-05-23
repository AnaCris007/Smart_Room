const pool = require('../config/db'); // Importa a conexão com o banco de dados

// Função para criar uma nova reserva com os dados recebidos
const criarReserva = async ({ matricula_alunos, id_salas_dispo, id_duracao, horario, dia }) => {
  const query = `
    INSERT INTO Reservas (matricula_alunos, id_salas_dispo, id_duracao, horario, dia)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;  // Retorna a reserva recém-criada
  `;
  const values = [matricula_alunos, id_salas_dispo, id_duracao, horario, dia];
  return pool.query(query, values);
};

// Função para listar todas as reservas ordenadas por dia (mais recente primeiro) e horário
const listarReservas = async () => {
  const query = `
    SELECT * FROM Reservas
    ORDER BY dia DESC, horario;
  `;
  return pool.query(query);
};

// Função para atualizar uma reserva específica pelo seu id_reservas
const atualizarReserva = async (id_reservas, { id_salas_dispo, id_duracao, horario, dia }) => {
  const query = `
    UPDATE Reservas
    SET id_salas_dispo = $1, id_duracao = $2, horario = $3, dia = $4
    WHERE id_reservas = $5
    RETURNING *;  // Retorna a reserva atualizada
  `;
  const values = [id_salas_dispo, id_duracao, horario, dia, id_reservas];
  return pool.query(query, values);
};

// Função para excluir uma reserva pelo id_reservas e retornar os dados da reserva excluída
const excluirReserva = async (id_reservas) => {
  const query = `
    DELETE FROM Reservas
    WHERE id_reservas = $1
    RETURNING *;  // Retorna a reserva excluída
  `;
  return pool.query(query, [id_reservas]);
};

module.exports = {
  criarReserva,
  listarReservas,
  atualizarReserva,
  excluirReserva,
};
