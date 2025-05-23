const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados

// Função para verificar se as credenciais de login são válidas
const verificarLogin = async (matricula, senha_aluno) => {
  const query = `
    SELECT * FROM alunos
    WHERE matricula = $1 AND senha_aluno = $2;  -- Busca o aluno com matrícula e senha correspondentes
  `;
  return pool.query(query, [matricula, senha_aluno]);  // Executa a query com os parâmetros fornecidos
};

module.exports = {
  verificarLogin,
};
