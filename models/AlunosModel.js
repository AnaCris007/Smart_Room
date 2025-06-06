const pool = require('../config/db'); // conexão com o banco de dados

// Verifica se a matrícula já existe
const verificarMatriculaExiste = async (matricula) => {
  const query = `SELECT 1 FROM alunos WHERE matricula = $1;`;
  const result = await pool.query(query, [matricula]);
  return result.rowCount > 0; // true se existir, false se não
};

// Cadastra um novo aluno no banco
const cadastrarAluno = async ({ matricula, nome, turma, ano, senha_aluno, email }) => {
  const query = `
    INSERT INTO alunos (matricula, nome, turma, ano, senha_aluno, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [matricula, nome, turma, ano, senha_aluno, email];
  return pool.query(query, values);
};

// Lista todos os alunos
const listarAlunos = () => {
  const query = `SELECT * FROM alunos ORDER BY nome;`;
  return pool.query(query);
};

// Lista todas as reservas feitas por um aluno (usando matrícula)
const listarReservasPorAlunoId = (matricula) => {
  const query = `
    SELECT r.*
    FROM reservas r
    WHERE r.matricula_alunos = $1
    ORDER BY r.dia DESC;
  `;
  return pool.query(query, [matricula]);
};

module.exports = {
  verificarMatriculaExiste,
  cadastrarAluno,
  listarAlunos,
  listarReservasPorAlunoId,
};
