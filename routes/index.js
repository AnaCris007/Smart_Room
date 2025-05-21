const express = require('express');
const router = express.Router();

// Importa as rotas separadas
const alunoRoutes = require('./AlunosRoutes');
const cancelamentoRoutes = require('./CancelamentosRoutes');
const reservasRoutes = require('./ReservasRoutes');
const salas_disponiveisRoutes = require('./Salas_disponiveisRoutes');
const LoginRoutes = require('./LoginRoutes');

// Usa as rotas com prefixo
router.use('/alunos', alunoRoutes);
router.use('/cancelamentos', cancelamentoRoutes);
router.use('/reservas', reservasRoutes);
router.use('/salas', salas_disponiveisRoutes);
router.use('/', LoginRoutes);

module.exports = router;
