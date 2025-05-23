const CancelamentoModel = require('../models/CancelamentoModel');

// Controlador para cancelar uma reserva
// Espera receber o id da reserva a ser cancelada no corpo da requisição (req.body)
const cancelarReserva = async (req, res) => {
  const { id_reservas } = req.body;

  // Valida se o campo id_reservas foi enviado
  if (!id_reservas) {
    return res.status(400).json({ erro: 'O campo id_reservas é obrigatório.' });
  }

  try {
    // Chama o model para realizar o cancelamento da reserva no banco de dados
    const resultado = await CancelamentoModel.cancelarReserva(id_reservas);

    // Retorna mensagem de sucesso com os dados do cancelamento
    res.status(201).json({
      mensagem: 'Reserva cancelada com sucesso.',
      cancelamento: resultado.rows[0],
    });
  } catch (error) {
    // Em caso de erro, registra no console e retorna status 500 (Internal Server Error)
    console.error('Erro ao cancelar reserva:', error);
    res.status(500).json({ erro: 'Erro ao cancelar a reserva.' });
  }
};

// Controlador para listar todos os cancelamentos
// Retorna uma lista com todos os cancelamentos registrados no banco de dados
const listarCancelamentos = async (req, res) => {
  try {
    const resultado = await CancelamentoModel.listarCancelamentos();
    res.status(200).json(resultado.rows); // Retorna os cancelamentos com status 200 (OK)
  } catch (error) {
    console.error('Erro ao listar cancelamentos:', error);
    res.status(500).json({ erro: 'Erro ao listar cancelamentos.' });
  }
};

// Exporta os controladores para que possam ser usados nas rotas
module.exports = {
  cancelarReserva,
  listarCancelamentos,
};
