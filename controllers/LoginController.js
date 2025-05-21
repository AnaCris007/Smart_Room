const db = require('../config/database');
const bcrypt = require('bcrypt');

const loginAluno = async (req, res) => {
  const { matricula, senha_aluno } = req.body;

  // Verifica se os dados foram fornecidos
  if (!matricula || !senha_aluno) {
    return res.status(400).json({ error: 'Matrícula e senha são obrigatórias.' });
  }

  try {
    // Busca o aluno pela matrícula
    const query = 'SELECT * FROM Alunos WHERE matricula = $1';
    const result = await db.query(query, [matricula]);

    // Se não encontrou aluno
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }

    const aluno = result.rows[0];

    // Compara a senha enviada com o hash armazenado
    const senhaCorreta = await bcrypt.compare(senha_aluno, aluno.senha_aluno);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Autenticação bem-sucedida
    return res.status(200).json({ mensagem: 'Login bem-sucedido.', aluno });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  loginAluno,
};
