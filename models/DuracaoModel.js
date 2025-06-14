const db = require('../config/db'); 

// Cadastrar nova duração
const cadastrarDuracao = async ({ descricao_duracao }) => {
  try {
    const query = `
      INSERT INTO Duracao (descricao_duracao)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [descricao_duracao];

    const resultado = await db.query(query, values);

    return { duracao: resultado.rows[0] };
  } catch (error) {
    if (error.code === '23505') { // UNIQUE VIOLATION
      return { erro: 'Descrição de duração já cadastrada.', status: 409 };
    }

    console.error('Erro ao cadastrar duração:', error);
    return { erro: 'Erro interno ao cadastrar duração.', status: 500 };
  }
};

// Listar todas as durações
const listarDuracoes = async () => {
  const query = 'SELECT * FROM Duracao ORDER BY id_duracao;';
  return await db.query(query);
};

module.exports = {
  cadastrarDuracao,
  listarDuracoes,
};
