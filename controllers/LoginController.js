const LoginModel = require('../models/LoginModel');
const bcrypt = require('bcrypt');

// Controlador para realizar o login do aluno usando matrícula e senha
const realizarLogin = async (req, res) => {
  const { matricula, senha_aluno } = req.body;

  // Validação simples para garantir que matrícula e senha foram fornecidas
  if (!matricula || !senha_aluno) {
    return res.status(400).json({ erro: 'Matrícula e senha são obrigatórios.' });
  }

  try {
    // Chama o model para verificar as credenciais no banco de dados
    const resultado = await LoginModel.verificarLogin(matricula);

    // Se nenhum usuário for encontrado, retorna erro 401 (Não autorizado)
    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: 'Matrícula ou senha inválidos.' });
    }

    const aluno = resultado.rows[0];
    const senhaCorreta = await bcrypt.compare(senha_aluno, aluno.senha_aluno);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Matrícula ou senha inválidos.' });
    }

    // Retorna uma resposta com os dados relevantes do aluno (sem a senha)
    res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      aluno: {
        id: aluno.id_aluno,
        nome: aluno.nome,
        turma: aluno.turma,
        ano: aluno.ano,
        email: aluno.email,
        matricula: aluno.matricula,
      }
    });
  } catch (error) {
    // Em caso de erro interno, loga no console e retorna erro 500
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ erro: 'Erro interno ao tentar realizar o login.' });
  }
};

// Exporta o controlador para uso nas rotas
module.exports = {
  realizarLogin,
};
