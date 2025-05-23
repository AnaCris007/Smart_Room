const reservasModel = require('../models/ReservasModel');

// Criar uma nova reserva
const criarReserva = async (req, res) => {
  try {
    // Extrai os dados da reserva enviados no corpo da requisição
    const { matricula_alunos, id_salas_dispo, id_duracao, horario, dia } = req.body;

    // Chama o model para inserir a nova reserva no banco de dados
    const resultado = await reservasModel.criarReserva({ matricula_alunos, id_salas_dispo, id_duracao, horario, dia });

    // Retorna status 201 (Created) com a reserva criada
    res.status(201).json({ mensagem: 'Reserva criada com sucesso!', reserva: resultado.rows[0] });
  } catch (error) {
    // Em caso de erro, loga e retorna erro 500 (Internal Server Error)
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ mensagem: 'Erro ao criar reserva.' });
  }
};

// Listar todas as reservas
const listarReservas = async (req, res) => {
  try {
    // Chama o model para buscar todas as reservas no banco de dados
    const resultado = await reservasModel.listarReservas();

    // Retorna status 200 (OK) com o array de reservas
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    res.status(500).json({ mensagem: 'Erro ao listar reservas.' });
  }
};

// Atualizar uma reserva pelo id_reservas (passado como parâmetro de URL)
const atualizarReserva = async (req, res) => {
  try {
    const id_reservas = req.params.id; // Pega o id da reserva da URL
    const { id_salas_dispo, id_duracao, horario, dia } = req.body; // Novos dados para atualização

    // Chama o model para atualizar a reserva com os dados fornecidos
    const resultado = await reservasModel.atualizarReserva(id_reservas, { id_salas_dispo, id_duracao, horario, dia });

    // Se não encontrou a reserva para atualizar, retorna 404 (Not Found)
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }

    // Retorna status 200 com a reserva atualizada
    res.status(200).json({ mensagem: 'Reserva atualizada com sucesso!', reserva: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ mensagem: 'Erro ao atualizar reserva.' });
  }
};

// Excluir uma reserva pelo id_reservas (passado como parâmetro de URL)
const excluirReserva = async (req, res) => {
  try {
    const id_reservas = req.params.id; // Pega o id da reserva da URL

    // Chama o model para excluir a reserva
    const resultado = await reservasModel.excluirReserva(id_reservas);

    // Se não encontrou a reserva para excluir, retorna 404 (Not Found)
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }

    // Retorna status 200 com a confirmação da exclusão
    res.status(200).json({ mensagem: 'Reserva excluída com sucesso!', reserva: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao excluir reserva:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir reserva.' });
  }
};

module.exports = {
  criarReserva,
  listarReservas,
  atualizarReserva,
  excluirReserva,
};
