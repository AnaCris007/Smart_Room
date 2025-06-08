const AlunosModel = require('../models/AlunosModel');
const bcrypt = require('bcrypt');

// Cadastrar novo aluno
const cadastrarAluno = async (req, res) => {
  try {
    // Apenas coleta os dados do request
    const { matricula, nome, turma, ano, senha_aluno, email } = req.body;

    // Chama o Model para tratar validações e cadastro
    const resultado = await AlunosModel.cadastrarAluno({
      matricula,
      nome,
      turma,
      ano,
      senha_aluno,
      email
    });

    if (resultado.erro) {
      return res.status(resultado.status || 400).json({ erro: resultado.erro });
    }

    res.status(201).json(resultado.aluno); // 201 Created
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
