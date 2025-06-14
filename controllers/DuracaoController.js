const DuracaoModel = require('../models/DuracaoModel');

// Cadastrar nova duração
const cadastrarDuracao = async (req, res) => {
  try {
    const { descricao_duracao } = req.body;

    if (!descricao_duracao) {
      return res.status(400).json({ erro: 'Descrição da duração é obrigatória.' });
    }

    const resultado = await DuracaoModel.cadastrarDuracao({ descricao_duracao });

    if (resultado.erro) {
      return res.status(resultado.status || 400).json({ erro: resultado.erro });
    }

    res.status(201).json(resultado.duracao);
  } catch (error) {
    console.error('Erro ao cadastrar duração:', error);
    res.status(500).json({ erro: 'Erro interno ao cadastrar duração.' });
  }
};

// Listar todas as durações
const listarDuracoes = async (req, res) => {
  try {
    const resultado = await DuracaoModel.listarDuracoes();
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar durações:', error);
    res.status(500).json({ erro: 'Erro interno ao listar durações.' });
  }
};

module.exports = {
  cadastrarDuracao,
  listarDuracoes,
};
