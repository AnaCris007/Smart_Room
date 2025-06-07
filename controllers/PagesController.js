const pool = require('../config/db');
const SalasDisponiveisModel = require('../models/Salas_disponiveisModel');
const ReservasModel = require('../models/ReservasModel');
const CancelamentosModel = require('../models/CancelamentosModel');

const PagesController = {
    paginaLogin: (req, res) => {
        res.render('Login');
    },

    paginaCadastro: (req, res) => {
        res.render('Cadastro');
    },

    paginaReservas: async (req, res) => {
        let matricula = req.query.matricula || null;
        let reservas = [];
        let totalCancelamentos = 0;
        let totalReservas = 0;
        if (matricula) {
            reservas = await ReservasModel.listarReservasPorMatricula(matricula);
            totalReservas = reservas.length;
            // Conta todos os cancelamentos do aluno, mesmo das reservas já canceladas
            totalCancelamentos = await CancelamentosModel.contarCancelamentosPorMatricula(matricula);
        }
        res.render('Reservas', { reservas, matricula, totalReservas, totalCancelamentos });
    },

    paginaSala: async (req, res) => {
        const salasPorSemana = await SalasDisponiveisModel.salasAgrupadasPorSemana();
        res.render('SalasDisponiveis', { salasPorSemana });
    },

    paginaConfirmar: async (req, res) => {
        const sala = req.query.sala || 'T-18';
        const data = req.query.data || '19/05';
        let horarios = { a_partir_das: '08:00', ate_as: '22:00' }; // padrão
        if (sala && data) {
            const dataFormatada = /^\d{4}-\d{2}-\d{2}$/.test(data) ? data : null;
            if (dataFormatada) {
                const info = await SalasDisponiveisModel.buscarHorarioDisponibilidade(sala, dataFormatada);
                if (info) horarios = info;
            }
        }
        res.render('ConfirmarReserva', { sala, data, horarios });
    },

    paginaConfirmarReserva: async (req, res) => {
        const { sala, data, horario } = req.query;
        let horarios = { a_partir_das: '08:00', ate_as: '22:00' }; // padrão
        if (sala && data) {
            const dataFormatada = /^\d{4}-\d{2}-\d{2}$/.test(data) ? data : null;
            if (dataFormatada) {
                const info = await SalasDisponiveisModel.buscarHorarioDisponibilidade(sala, dataFormatada);
                if (info) horarios = info;
            }
        }
        res.render('ConfirmarReserva', { sala, data, horario, horarios });
    },

    paginaAdicionarSala: async (req, res) => {
        res.render('AdicionarSala');
    },
};

module.exports = PagesController;
