const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados

// Função para cancelar uma reserva, inserindo um registro na tabela de cancelamentos
const cancelarReserva = async (id_reservas) => {
  const query = `
    INSERT INTO Cancelamentos (id_reservas, dia_cancelar)
    VALUES ($1, CURRENT_DATE)  -- Define a data do cancelamento como a data atual
    RETURNING *;  -- Retorna os dados do cancelamento inserido
  `;
  return pool.query(query, [id_reservas]);  // Executa a query passando o id da reserva
};

// Função para listar todos os cancelamentos com detalhes da reserva relacionada
const listarCancelamentos = async () => {
  const query = `
    SELECT c.*, r.id_aluno, r.id_sala, r.data_reserva, r.horario_inicio, r.horario_fim
    FROM Cancelamentos c
    JOIN Reservas r ON c.id_reservas = r.id_reservas  -- Junta as tabelas para obter informações completas
    ORDER BY c.dia_cancelar DESC;  -- Ordena do cancelamento mais recente para o mais antigo
  `;
  return pool.query(query);  // Executa a query para retornar os cancelamentos
};

const contarCancelamentosPorMatricula = async (matricula_alunos) => {
    const result = await pool.query(
        `SELECT COUNT(*) FROM cancelamentos c
         JOIN reservas r ON c.id_reservas = r.id_reservas
         WHERE r.matricula_alunos = $1`,
        [matricula_alunos]
    );
    return parseInt(result.rows[0].count, 10);
};

module.exports = {
  cancelarReserva,
  listarCancelamentos,
  contarCancelamentosPorMatricula,
};
