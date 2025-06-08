const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Verifica se a matrícula já existe
const verificarMatriculaExiste = async (matricula) => {
  const query = `SELECT 1 FROM alunos WHERE matricula = $1;`;
  const result = await pool.query(query, [matricula]);
  return result.rowCount > 0; // true se existir, false se não
};

// Cadastra um novo aluno no banco, com todas as validações e regra de negócio
const cadastrarAluno = async ({ matricula, nome, turma, ano, senha_aluno, email }) => {
  // Validações de regra de negócio
  if (!matricula || isNaN(matricula)) {
    return { erro: 'Matrícula inválida.' };
  }
  if (!nome?.trim()) {
    return { erro: 'Nome inválido.' };
  }
  if (!turma?.trim()) {
    return { erro: 'Turma inválida.' };
  }
  if (!ano || isNaN(ano) || ano < 1 || ano > 12) {
    return { erro: 'Ano inválido. Deve estar entre 1 e 12.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { erro: 'Email inválido.' };
  }
  if (!senha_aluno || senha_aluno.length < 4) {
    return { erro: 'A senha deve ter pelo menos 4 caracteres.' };
  }

  // Verifica se a matrícula já existe
  const existe = await pool.query('SELECT 1 FROM alunos WHERE matricula = $1;', [matricula]);
  if (existe.rowCount > 0) {
    return { erro: 'Matrícula já cadastrada.', status: 409 };
  }

  // Criptografa a senha
  const senhaHash = await bcrypt.hash(senha_aluno, 10);

  // Insere no banco
  const query = `
    INSERT INTO alunos (matricula, nome, turma, ano, senha_aluno, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [matricula, nome.trim(), turma.trim(), ano, senhaHash, email.trim()];
  const result = await pool.query(query, values);
  return { aluno: result.rows[0] };
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
