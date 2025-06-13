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
        let nomeUsuario = ''; // <-- sempre define a variável
        if (matricula) {
            reservas = await ReservasModel.listarReservasPorMatricula(matricula);
            totalReservas = reservas.length;
            totalCancelamentos = await CancelamentosModel.contarCancelamentosPorMatricula(matricula);
            // Busca o nome do usuário no banco
            try {
                // Só busca se existir o model e o método
                if (require('../models/AlunoModel').buscarAlunoPorMatricula) {
                    const aluno = await require('../models/AlunoModel').buscarAlunoPorMatricula(matricula);
                    if (aluno && aluno.nome) nomeUsuario = aluno.nome;
                }
            } catch (e) {
                nomeUsuario = '';
            }
        }
        // Sempre envia nomeUsuario para a view
        res.render('Reservas', { reservas, matricula, totalReservas, totalCancelamentos, nomeUsuario });
    },

    paginaSala: async (req, res) => {
        const salasPorSemana = await SalasDisponiveisModel.salasAgrupadasPorSemana();
        res.render('SalasDisponiveis', { salasPorSemana });
    },

    paginaConfirmar: async (req, res) => {
        const sala = req.query.sala || 'T-18';
        const data = req.query.data || null;
        let horarios = { a_partir_das: '08:00', ate_as: '22:00' }; // padrão
        let dataFormatada = null;
        if (data) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
                dataFormatada = data;
            } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
                // Converte DD/MM/YYYY para YYYY-MM-DD
                const [d, m, y] = data.split('/');
                dataFormatada = `${y}-${m}-${d}`;
            } else if (/^\d{2}-\d{2}-\d{4}$/.test(data)) {
                // Converte DD-MM-YYYY para YYYY-MM-DD
                const [d, m, y] = data.split('-');
                dataFormatada = `${y}-${m}-${d}`;
            }
        }
        if (sala && dataFormatada) {
            const info = await SalasDisponiveisModel.buscarHorarioDisponibilidade(sala, dataFormatada);
            if (info) horarios = info;
        }
        res.render('ConfirmarReserva', { sala, data, horarios });
    },

    paginaConfirmarReserva: async (req, res) => {
    const { sala, data, horario } = req.query;
    let horarios = { a_partir_das: '08:00', ate_as: '22:00' }; // padrão
    let dataFormatada = null;
    if (data) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            dataFormatada = data;
        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            // Converte DD/MM/YYYY para YYYY-MM-DD
            const [d, m, y] = data.split('/');
            dataFormatada = `${y}-${m}-${d}`;
        } else if (/^\d{2}-\d{2}-\d{4}$/.test(data)) {
            // Converte DD-MM-YYYY para YYYY-MM-DD
            const [d, m, y] = data.split('-');
            dataFormatada = `${y}-${m}-${d}`;
        }
    }
    if (sala && dataFormatada) {
        const info = await SalasDisponiveisModel.buscarHorarioDisponibilidade(sala, dataFormatada);
        if (info) horarios = info;
    }
        res.render('ConfirmarReserva', { sala, data, horario, horarios });
    },

    paginaAdicionarSala: async (req, res) => {
        res.render('AdicionarSala');
    },
};

module.exports = PagesController;
