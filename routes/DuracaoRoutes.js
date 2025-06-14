const express = require('express');
const router = express.Router();
const DuracaoController = require('../controllers/DuracaoController');

// Rota para cadastrar nova duração
router.post('/novaDuracao', DuracaoController.cadastrarDuracao);

// Rota para listar todas as durações
router.get('/duracoes', DuracaoController.listarDuracoes);

module.exports = router;
