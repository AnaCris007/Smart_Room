const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados

// Função para verificar se as credenciais de login são válidas
const verificarLogin = async (matricula) => {
  const query = `
    SELECT * FROM alunos
    WHERE matricula = $1;  -- Busca o aluno com matrícula correspondente
  `;
  return pool.query(query, [matricula]);  // Executa a query com os parâmetros fornecidos
};

module.exports = {
  verificarLogin,
};
