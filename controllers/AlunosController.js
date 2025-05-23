//Importa AlunosModel
const AlunosModel = require('../models/AlunosModel');

// Cadastrar novo aluno
// Recebe os dados do aluno pelo corpo da requisição (req.body)
// e chama a função correspondente no model para inseri-lo no banco de dados
const cadastrarAluno = async (req, res) => {
  try {
    const novoAluno = await AlunosModel.cadastrarAluno(req.body);
    res.status(201).json(novoAluno.rows[0]); // Retorna o aluno cadastrado com status 201 (Created)
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ erro: 'Erro ao cadastrar aluno.' });
  }
};

// Listar todos os alunos
// Busca todos os alunos no banco de dados e retorna em formato JSON
const listarAlunos = async (req, res) => {
  try {
    const resultado = await AlunosModel.listarAlunos();
    res.status(200).json(resultado.rows); // Retorna lista de alunos com status 200 (OK)
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
    res.status(500).json({ erro: 'Erro ao listar alunos.' });
  }
};

// Listar reservas por aluno
// Recebe o ID do aluno como parâmetro na URL 
// e retorna todas as reservas relacionadas a esse aluno
const listarReservasPorAluno = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await AlunosModel.listarReservasPorAlunoId(id);
    res.status(200).json(resultado.rows); // Retorna as reservas com status 200 (OK)
  } catch (error) {
    console.error('Erro ao listar reservas do aluno:', error);
    res.status(500).json({ erro: 'Erro ao listar reservas do aluno.' });
  }
};

// Exporta os controladores para serem usados nas rotas
module.exports = {
  cadastrarAluno,
  listarAlunos,
  listarReservasPorAluno,
};
