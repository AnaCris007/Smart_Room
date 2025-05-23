const pool = require('../config/db'); // Importa a conexão com o banco de dados

// Função para criar uma nova sala disponível com os dados fornecidos
const criarSalaDisponivel = async ({ numero_sala, dia_disponivel, a_partir_das, ate_as }) => {
  const query = `
    INSERT INTO Salas_disponiveis (numero_sala, dia_disponivel, a_partir_das, ate_as)
    VALUES ($1, $2, $3, $4)
    RETURNING *;  // Retorna a sala criada
  `;
  const values = [numero_sala, dia_disponivel, a_partir_das, ate_as];
  return pool.query(query, values);
};

// Função para listar todas as salas disponíveis, ordenando por dia e número da sala
const listarSalasDisponiveis = async () => {
  const query = `
    SELECT * FROM Salas_disponiveis
    ORDER BY dia_disponivel, numero_sala;
  `;
  return pool.query(query);
};

// Função para atualizar os dados de uma sala disponível específica pelo seu id_salas_dispo
const atualizarSalaDisponivel = async (id_salas_dispo, { numero_sala, dia_disponivel, a_partir_das, ate_as }) => {
  const query = `
    UPDATE Salas_disponiveis
    SET numero_sala = $1, dia_disponivel = $2, a_partir_das = $3, ate_as = $4
    WHERE id_salas_dispo = $5
    RETURNING *;  // Retorna a sala atualizada
  `;
  const values = [numero_sala, dia_disponivel, a_partir_das, ate_as, id_salas_dispo];
  return pool.query(query, values);
};

// Função para excluir uma sala disponível pelo id_salas_dispo e retornar os dados excluídos
const excluirSalaDisponivel = async (id_salas_dispo) => {
  const query = `
    DELETE FROM Salas_disponiveis
    WHERE id_salas_dispo = $1
    RETURNING *;  // Retorna a sala excluída
  `;
  return pool.query(query, [id_salas_dispo]);
};

module.exports = {
  criarSalaDisponivel,
  listarSalasDisponiveis,
  atualizarSalaDisponivel,
  excluirSalaDisponivel,
};
