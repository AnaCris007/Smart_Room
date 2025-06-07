const express = require('express');
const router = express.Router();
const alunosController = require('../controllers/AlunosController');
const reservasController = require('../controllers/ReservasController');

router.post('/', alunosController.cadastrarAluno);
router.get('/', alunosController.listarAlunos);

// Rota para listar reservas de um aluno específico
router.get('/:matricula/reservas', reservasController.listarReservasPorAluno);

module.exports = router;
