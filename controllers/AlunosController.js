const AlunosModel = require('../models/AlunosModel');
const bcrypt = require('bcrypt');

// Cadastrar novo aluno
const cadastrarAluno = async (req, res) => {
  try {
    const { matricula, nome, turma, ano, senha_aluno, email } = req.body;

    // Validações básicas
    if (!matricula || isNaN(matricula)) {
      return res.status(400).json({ erro: 'Matrícula inválida.' });
    }

    if (!nome?.trim()) {
      return res.status(400).json({ erro: 'Nome inválido.' });
    }

    if (!turma?.trim()) {
      return res.status(400).json({ erro: 'Turma inválida.' });
    }

    if (!ano || isNaN(ano) || ano < 1 || ano > 12) {
      return res.status(400).json({ erro: 'Ano inválido. Deve estar entre 1 e 12.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ erro: 'Email inválido.' });
    }

    if (!senha_aluno || senha_aluno.length < 4) {
      return res.status(400).json({ erro: 'A senha deve ter pelo menos 4 caracteres.' });
    }

    // Verifica se a matrícula já existe
    const jaExiste = await AlunosModel.verificarMatriculaExiste(matricula);
    if (jaExiste) {
      return res.status(409).json({ erro: 'Matrícula já cadastrada.' }); // 409 Conflict
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha_aluno, 10);

    // Cadastra o aluno
    const novoAluno = await AlunosModel.cadastrarAluno({
      matricula,
      nome: nome.trim(),
      turma: turma.trim(),
      ano,
      senha_aluno: senhaHash,
      email: email.trim(),
    });

    res.status(201).json(novoAluno.rows[0]); // 201 Created
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar aluno.' });
  }
};

// Listar todos os alunos
const listarAlunos = async (req, res) => {
  try {
    const resultado = await AlunosModel.listarAlunos();
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
    res.status(500).json({ erro: 'Erro interno ao listar alunos.' });
  }
};

// Listar reservas de um aluno específico
const listarReservasPorAluno = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await AlunosModel.listarReservasPorAlunoId(id);
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar reservas do aluno:', error);
    res.status(500).json({ erro: 'Erro interno ao listar reservas do aluno.' });
  }
};

module.exports = {
  cadastrarAluno,
  listarAlunos,
  listarReservasPorAluno,
};
