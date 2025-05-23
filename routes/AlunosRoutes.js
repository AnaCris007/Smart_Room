const express = require('express');
const router = express.Router();
const AlunosController = require('../controllers/AlunosController');

router.post('/', AlunosController.cadastrarAluno);
router.get('/', AlunosController.listarAlunos);
router.get('/:id/reservas', AlunosController.listarReservasPorAluno);

module.exports = router;
