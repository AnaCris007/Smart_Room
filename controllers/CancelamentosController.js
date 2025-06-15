const CancelamentosModel = require('../models/CancelamentoModel');

exports.cancelarReserva = async (req, res) => {
    try {
        const { id_reservas } = req.body;
        if (!id_reservas) {
            return res.status(400).json({ erro: 'ID da reserva é obrigatório.' });
        }
        await CancelamentosModel.cancelarReserva(id_reservas);
        res.status(200).json({ ok: true });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao cancelar reserva: ' + err.message });
    }
};
