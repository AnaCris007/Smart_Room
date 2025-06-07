const express = require('express'); // Importa o Express para criar o roteador
const router = express.Router();    // Cria um roteador para agrupar as rotas

// Importa os módulos de rotas de diferentes partes da aplicação
const alunoRoutes = require('./AlunosRoutes');
const cancelamentoRoutes = require('./CancelamentosRoutes');
const reservasRoutes = require('./ReservasRoutes');
const salas_disponiveisRoutes = require('./Salas_disponiveisRoutes');
const LoginRoutes = require('./LoginRoutes');

// Define o prefixo da URL para cada grupo de rotas
router.use('/alunos', alunoRoutes);              // Rotas relacionadas aos alunos
router.use('/cancelamentos', cancelamentoRoutes); // Rotas relacionadas aos cancelamentos
router.use('/reservas', reservasRoutes);          // Rotas relacionadas às reservas
router.use('/salas_disponiveis', salas_disponiveisRoutes); // Rotas relacionadas às salas disponíveis
router.use('/login', LoginRoutes);                 // Rotas relacionadas ao login/autenticação

// Exporta o roteador configurado para ser usado no app principal
module.exports = router;
