const ReservasModel = require('../models/ReservasModel');

// Cria uma reserva
exports.criarReserva = async (req, res) => {
    try {
        const { numero_sala, dia, horario, duracao, matricula_alunos } = req.body;
        if (!matricula_alunos) {
            return res.status(400).json({ erro: 'Matrícula do aluno é obrigatória.' });
        }
        await ReservasModel.criarReserva({ numero_sala, dia, horario, duracao, matricula_alunos });
        res.status(201).json({ ok: true });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar reserva: ' + err.message });
    }
};

// Lista reservas de um aluno (GET /alunos/:matricula/reservas)
exports.listarReservasPorAluno = async (req, res) => {
    try {
        const { matricula } = req.params;
        const reservas = await ReservasModel.listarReservasPorMatricula(matricula);
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar reservas.' });
    }
};
