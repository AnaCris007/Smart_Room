const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados

// Função para verificar se as credenciais de login são válidas
const verificarLogin = async (matricula) => {
  const query = `
    SELECT matricula, nome, turma, ano, email, senha_aluno
    FROM alunos
    WHERE matricula = $1;
  `;
  return pool.query(query, [matricula]);
};

module.exports = {
  verificarLogin,
};
