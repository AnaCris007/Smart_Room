const salasDisponiveisModel = require('../models/Salas_disponiveisModel');

// Criar uma nova sala disponível
const criarSalaDisponivel = async (req, res) => {
  try {
    // Extrai os dados da nova sala disponível do corpo da requisição
    const { numero_sala, dia_disponivel, a_partir_das, ate_as } = req.body;

    // Chama o model para inserir a sala disponível no banco de dados
    const resultado = await salasDisponiveisModel.criarSalaDisponivel({ numero_sala, dia_disponivel, a_partir_das, ate_as });

    // Retorna status 201 (Created) com a sala criada
    res.status(201).json({ mensagem: 'Sala disponível criada com sucesso!', sala: resultado.rows[0] });
  } catch (error) {
    // Em caso de erro, loga e retorna status 500 (Internal Server Error)
    console.error('Erro ao criar sala disponível:', error);
    res.status(500).json({ mensagem: 'Erro ao criar sala disponível.' });
  }
};

// Listar todas as salas disponíveis
const listarSalasDisponiveis = async (req, res) => {
  try {
    // Chama o model para buscar todas as salas disponíveis
    const resultado = await salasDisponiveisModel.listarSalasDisponiveis();

    // Retorna status 200 (OK) com o array de salas disponíveis
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar salas disponíveis:', error);
    res.status(500).json({ mensagem: 'Erro ao listar salas disponíveis.' });
  }
};

// Atualizar uma sala disponível pelo id_salas_dispo (passado via URL)
const atualizarSalaDisponivel = async (req, res) => {
  try {
    const id_salas_dispo = req.params.id; // Pega o id da sala disponível da URL
    const { numero_sala, dia_disponivel, a_partir_das, ate_as } = req.body; // Novos dados para atualizar

    // Chama o model para atualizar a sala disponível
    const resultado = await salasDisponiveisModel.atualizarSalaDisponivel(id_salas_dispo, { numero_sala, dia_disponivel, a_partir_das, ate_as });

    // Se não encontrou a sala para atualizar, retorna 404 (Not Found)
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Sala disponível não encontrada.' });
    }

    // Retorna status 200 com a sala atualizada
    res.status(200).json({ mensagem: 'Sala disponível atualizada com sucesso!', sala: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar sala disponível:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar sala disponível.' });
  }
};

// Excluir uma sala disponível pelo id_salas_dispo (passado via URL)
const excluirSalaDisponivel = async (req, res) => {
  try {
    const id_salas_dispo = req.params.id; // Pega o id da sala disponível da URL

    // Chama o model para excluir a sala disponível
    const resultado = await salasDisponiveisModel.excluirSalaDisponivel(id_salas_dispo);

    // Se não encontrou a sala para excluir, retorna 404 (Not Found)
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Sala disponível não encontrada.' });
    }

    // Retorna status 200 com a confirmação da exclusão
    res.status(200).json({ mensagem: 'Sala disponível excluída com sucesso!', sala: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao excluir sala disponível:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir sala disponível.' });
  }
};

module.exports = {
  criarSalaDisponivel,
  listarSalasDisponiveis,
  atualizarSalaDisponivel,
  excluirSalaDisponivel,
};
