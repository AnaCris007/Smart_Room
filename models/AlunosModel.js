const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados

// Função para cadastrar um novo aluno no banco
const cadastrarAluno = async ({ matricula, nome, turma, ano, senha_aluno, email }) => {
  const query = `
    INSERT INTO alunos (matricula, nome, turma, ano, senha_aluno, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;  -- Retorna os dados do aluno recém-cadastrado
  `;
  const values = [matricula, nome, turma, ano, senha_aluno, email];
  return pool.query(query, values);  // Executa a query passando os valores
};

// Função para listar todos os alunos ordenados por nome
const listarAlunos = () => {
  const query = `SELECT * FROM alunos ORDER BY nome;`;
  return pool.query(query);  // Executa a query e retorna todos os alunos
};

// Função para listar todas as reservas feitas por um aluno específico, identificando pela matrícula
const listarReservasPorAlunoId = (matricula) => {
  const query = `
    SELECT r.*
    FROM reservas r
    WHERE r.matricula_alunos = $1  -- Filtra reservas pela matrícula do aluno
    ORDER BY r.dia DESC;  -- Ordena as reservas da mais recente para a mais antiga
  `;
  return pool.query(query, [matricula]);  // Executa a query com o parâmetro da matrícula
};

module.exports = {
  cadastrarAluno,
  listarAlunos,
  listarReservasPorAlunoId,
};
